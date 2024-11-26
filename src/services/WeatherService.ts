import { WeatherData } from '../models/WeatherData';
import { CacheService } from './CacheService';
import { MetricsService } from './MetricsService';
import { WeatherApiClient } from '../lib/WeatherApiClient';
import { RetryStrategy } from '../utils/RetryStrategy';
import { CircuitBreaker } from '../utils/CircuitBreaker';

export class WeatherService {
  private cacheService: CacheService;
  private metricsService: MetricsService;
  private weatherApiClient: WeatherApiClient;
  private retryStrategy: RetryStrategy;
  private circuitBreaker: CircuitBreaker;

  constructor(
    cacheService: CacheService,
    metricsService: MetricsService,
    weatherApiClient: WeatherApiClient
  ) {
    this.cacheService = cacheService;
    this.metricsService = metricsService;
    this.weatherApiClient = weatherApiClient;
    this.retryStrategy = new RetryStrategy(3, 1000);
    this.circuitBreaker = new CircuitBreaker(5, 60000);
  }

  async getWeatherData(city: string): Promise<WeatherData> {
    if (!city || typeof city !== 'string') {
      throw new Error('Invalid city parameter');
    }

    // Start metrics tracking
    const timer = this.metricsService.startTimer('weather_data_fetch');

    try {
      // Check cache first
      const cachedData = await this.cacheService.get(`weather:${city}`);
      if (cachedData) {
        this.metricsService.incrementCounter('cache_hit');
        timer.end();
        return JSON.parse(cachedData);
      }

      // Fetch from API with circuit breaker and retry pattern
      const weatherData = await this.circuitBreaker.execute(async () => {
        return await this.retryStrategy.execute(async () => {
          const data = await this.weatherApiClient.fetchWeather(city);
          return this.transformWeatherData(data);
        });
      });

      // Cache the result
      await this.cacheService.set(
        `weather:${city}`,
        JSON.stringify(weatherData),
        3600 // Cache for 1 hour
      );

      timer.end();
      return weatherData;
    } catch (error) {
      timer.end();
      this.metricsService.incrementCounter('weather_data_fetch_error');
      throw error;
    } finally {
      timer.end();
    }
  }

  private transformWeatherData(data: any): WeatherData {
    if (!data || !data.main || !data.weather || !data.weather[0]) {
      throw new Error('Invalid weather data format');
    }

    return {
      city: data.name,
      temperature: {
        celsius: data.main.temp,
        fahrenheit: (data.main.temp * 9) / 5 + 32,
      },
      wind: {
        speed: data.wind.speed,
        direction: this.calculateWindDirection(data.wind.deg),
      },
      conditions: {
        main: data.weather[0].main,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      },
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      timestamp: data.dt,
    };
  }

  private calculateWindDirection(degrees: number): string {
    const directions = [
      'N',
      'NNE',
      'NE',
      'ENE',
      'E',
      'ESE',
      'SE',
      'SSE',
      'S',
      'SSW',
      'SW',
      'WSW',
      'W',
      'WNW',
      'NW',
      'NNW',
    ];
    const index = Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 22.5) % 16;
    return directions[index];
  }
}

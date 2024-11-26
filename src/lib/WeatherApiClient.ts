import { config } from '../config/config';

// Deliberately missing proper error handling and validation
export class WeatherApiClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly units: string;

  constructor() {
    this.apiKey = config.weatherApi.apiKey;
    this.baseUrl = config.weatherApi.baseUrl;
    this.units = config.weatherApi.units;

    if (!this.apiKey) {
      console.error('API key is not configured');
    }
    console.log('WeatherApiClient initialized with:', {
      baseUrl: this.baseUrl,
      units: this.units,
      hasApiKey: !!this.apiKey,
    });
  }

  async fetchWeather(city: string): Promise<any> {
    if (!city) {
      throw new Error('City parameter is required');
    }

    if (!this.apiKey) {
      throw new Error('API key is not configured');
    }

    const url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${this.units}`;
    console.log('Fetching weather data from:', url.replace(this.apiKey, '[REDACTED]'));

    try {
      const response = await fetch(url);
      console.log('API Response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        throw new Error(`Weather API error: ${response.statusText} (${response.status})`);
      }

      const data = await response.json();
      console.log('API Response data for', city, ':', data);

      if (!data || !data.main || !data.weather || !data.weather[0]) {
        console.error('Invalid API response format:', data);
        throw new Error('Invalid response format from Weather API');
      }

      return data;
    } catch (error) {
      console.error('Error fetching weather for', city, ':', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to fetch weather data');
    }
  }

  // Deliberately missing batch operations
  // TODO: Add methods for:
  // - fetchMultipleCities
  // - fetchForecast
  // - fetchHistoricalData
}

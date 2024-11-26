import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { WeatherService } from '../services/WeatherService'
import { CacheService } from '../services/CacheService'
import { MetricsService } from '../services/MetricsService'
import { WeatherApiClient } from '../lib/WeatherApiClient'
import type { WeatherData } from '../models/WeatherData'

// Initialize services
const cacheService = new CacheService()
const metricsService = new MetricsService()
const weatherApiClient = new WeatherApiClient()
const weatherService = new WeatherService(cacheService, metricsService, weatherApiClient)

export default function WeatherDetail() {
  const { cityName } = useParams<{ cityName: string }>()
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeatherData() {
      if (!cityName) {
        setError("Invalid city name provided.")
        setLoading(false)
        return
      }

      try {
        const decodedCity = decodeURIComponent(cityName).trim()
        if (!decodedCity) {
          setError("City name cannot be empty.")
          setLoading(false)
          return
        }

        const weatherData = await weatherService.getWeatherData(decodedCity)
        setWeather(weatherData)
        setError(null)
      } catch (error) {
        console.error(`Error fetching weather data for ${cityName}:`, error)
        setError(`Failed to fetch weather data for ${cityName}. Please try again later.`)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [cityName])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      </div>
    )
  }

  if (!weather) {
    return (
      <div className="container mx-auto p-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mt-4">
          No weather data available.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-neutral-light min-h-screen">
      <Helmet>
        <title>{`${weather.city} Weather`}</title>
      </Helmet>

      <div className="container mx-auto p-4">
        <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
          ← Back to Dashboard
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mt-4" data-testid="weather-detail">
          <h1 className="text-4xl font-bold mb-6" data-testid="city-name">{weather.city}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <img 
                  src={`http://openweathermap.org/img/w/${weather.conditions.icon}.png`}
                  alt={weather.conditions.description}
                  className="w-16 h-16 mr-4"
                  data-testid="weather-icon"
                />
                <div>
                  <h2 className="text-3xl font-bold" data-testid="temperature-celsius">
                    {weather.temperature.celsius.toFixed(1)}°C
                  </h2>
                  <p className="text-gray-600 capitalize" data-testid="weather-description">
                    {weather.conditions.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-gray-600">Humidity</p>
                  <p className="text-xl" data-testid="humidity">{weather.humidity}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Wind Speed</p>
                  <p className="text-xl" data-testid="wind-speed">{weather.wind.speed} m/s</p>
                </div>
                <div>
                  <p className="text-gray-600">Temperature (F)</p>
                  <p className="text-xl" data-testid="temperature-fahrenheit">
                    {weather.temperature.fahrenheit.toFixed(1)}°F
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Pressure</p>
                  <p className="text-xl" data-testid="pressure">{weather.pressure} hPa</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-neutral-light p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-600">Wind Direction:</span>{' '}
                    <span data-testid="wind-direction">{weather.wind.direction}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Weather Type:</span>{' '}
                    <span data-testid="weather-type">{weather.conditions.main}</span>
                  </p>
                  <p>
                    <span className="text-gray-600">Last Updated:</span>{' '}
                    <span data-testid="last-updated">
                      {new Date(weather.timestamp).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

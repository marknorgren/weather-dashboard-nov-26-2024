// TODO: Add proper validation
// TODO: Add serialization methods
// TODO: Add data versioning
// TODO: Add data transformation methods

export interface Temperature {
  celsius: number;
  fahrenheit: number;
}

export interface Wind {
  speed: number;
  direction: string;
}

export interface WeatherCondition {
  main: string;
  description: string;
  icon: string;
}

export interface WeatherData {
  city: string;
  temperature: Temperature;
  wind: Wind;
  conditions: WeatherCondition;
  humidity: number;
  pressure: number;
  timestamp: number;
}

// TODO: This is a basic configuration implementation
// Candidates can suggest improvements:
// 1. Use environment variables
// 2. Add configuration validation
// 3. Implement different environments (dev, staging, prod)
// 4. Add secrets management
// 5. Add configuration reloading

export const config = {
  weatherApi: {
    apiKey: process.env.OPENWEATHERMAP_API_KEY || '',
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    timeout: 5000,
    units: 'metric', // Use metric by default
  },
  cache: {
    ttl: 3600,
    maxSize: 1000,
  },
  circuitBreaker: {
    failureThreshold: 5,
    resetTimeout: 60000,
  },
  retry: {
    maxAttempts: 3,
    initialDelay: 1000,
  },
  metrics: {
    enabled: true,
    flushInterval: 60000,
  },
};

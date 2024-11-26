// TODO: This is a basic configuration implementation
// Candidates can suggest improvements:
// 1. Use environment variables
// 2. Add configuration validation
// 3. Implement different environments (dev, staging, prod)
// 4. Add secrets management
// 5. Add configuration reloading

export const config = {
  weatherApi: {
    apiKey: import.meta.env.VITE_OPENWEATHERMAP_API_KEY || '',
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
    resetTimeout: 60000, // 1 minute
  },
  retry: {
    maxAttempts: 3,
    delay: 1000, // 1 second
  },
  metrics: {
    enabled: true,
    flushInterval: 10000, // 10 seconds
  },
};

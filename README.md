# React Site Base

## Project Overview

This is a basic React-based weather application.


## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your OpenWeatherMap API key in the environment
4. Start the development server: `npm run dev`

## Technical Implementation Exercise

Choose ONE of the following features to implement. Your implementation should demonstrate software engineering best practices, including proper error handling, testing, and documentation.

### Feature Options:

1. **Caching System**
   - Update to use in-memory cache
   - Implement TTL-based cache invalidation
   - Add cache hit/miss metrics

2. **Advanced Metrics Dashboard**
   - Create a new `/metrics` endpoint displaying:
     - Request latency histograms
     - Cache hit/miss rates
     - Error rates by endpoint
     - Rate limiting statistics

3. **Multi-City Weather Comparison**
   - Add ability to search and compare up to 4 cities
   - Display side-by-side weather comparisons
   - Implement a responsive grid layout
   - Add temperature trend charts using a charting library
   - Include min/max temperature forecasts

4. **Dark Mode**
   - Add a dark mode toggle
   - Implement dark mode styles
   - Utilize CSS variables for easy customization

5. **Location-Based Weather Features**
   - Add geolocation support
   - Implement reverse geocoding to get city from coordinates
   - Add nearby cities suggestions

6. **Add Unit Tests**
   - Setup unit tests
   - Implement integration tests
   - Edge case handling
   - Test coverage report
  
7. **Add a component to show the high and low temp Cities**
   - Create a component that will show the high temp
   - Create a component that will show the low temp
   - Create a component that will show both

## Evaluation Criteria

- **Code Quality **
  - Clean, readable, and well-organized code
  - Proper error handling
  - TypeScript types and interfaces
  - Code reusability

- **Testing **
  - Unit tests for new functionality
  - Integration tests where appropriate
  - Edge case handling
  - Test coverage report

- **Technical Design / Analysis **
  - Architecture decisions
  - Performance considerations
  - Scalability approach
  - Security measures

- **Documentation (15%)**
  - Clear README updates
  - API documentation
  - Setup instructions
  - Design decisions explanation

## Submission Guidelines

1. Create a new branch for your implementation
2. Write clear commit messages
3. Include a brief write-up explaining:
   - Which feature you chose and why
   - Your implementation approach
   - Any trade-offs you made
   - What you would do differently with more time
4. Create a pull request with your changes

## Additional Notes

- Feel free to add any necessary dependencies
- You can refactor existing code if needed
- Focus on quality over quantity
- Consider edge cases and error scenarios

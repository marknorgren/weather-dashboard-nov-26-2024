import { test, expect } from '@playwright/test';
import { POPULAR_CITIES } from '../src/cities';
import fs from 'fs';
import path from 'path';

// Test configuration
const TEST_CONFIG = {
  SCREENSHOT_DIR: './test-results/screenshots',
  BASE_URL: 'http://localhost:5175',
  TIMEOUT: 10000
};

// Ensure screenshot directory exists
if (!fs.existsSync(TEST_CONFIG.SCREENSHOT_DIR)) {
  fs.mkdirSync(TEST_CONFIG.SCREENSHOT_DIR, { recursive: true });
}

test.describe('Weather Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Set a reasonable viewport size
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // Go to homepage and wait for initial load
    await page.goto(TEST_CONFIG.BASE_URL);
    await page.waitForLoadState('networkidle');
  });

  test('Homepage loads with content', async ({ page }) => {
    console.log('Starting homepage test...');
    
    // Check for main content area
    const main = await page.locator('main').first();
    await expect(main).toBeVisible();

    // Take desktop screenshot
    await page.screenshot({
      path: path.join(TEST_CONFIG.SCREENSHOT_DIR, 'homepage-desktop.png'),
      fullPage: true
    });

    // Take mobile screenshot
    await page.setViewportSize({ width: 375, height: 667 });
    await page.screenshot({
      path: path.join(TEST_CONFIG.SCREENSHOT_DIR, 'homepage-mobile.png'),
      fullPage: true
    });
  });

  test('City detail pages load correctly', async ({ page }) => {
    console.log('Starting city detail pages test...');
    
    // Test a few specific cities
    const citiesToTest = ['Sydney', 'London', 'Tokyo'];
    
    for (const city of citiesToTest) {
      console.log(`Testing ${city} detail page...`);
      
      // Navigate directly to the city page
      const cityUrl = `${TEST_CONFIG.BASE_URL}/weather/${city.toLowerCase()}`;
      console.log(`Navigating to ${cityUrl}`);
      
      await page.goto(cityUrl);
      await page.waitForLoadState('networkidle');
      
      console.log('Page loaded, checking content...');
      
      // Verify weather detail container is present
      const weatherDetail = await page.locator('[data-testid="weather-detail"]');
      await expect(weatherDetail).toBeVisible({ timeout: TEST_CONFIG.TIMEOUT });
      
      // Verify city name is present and correct
      const cityName = await page.locator('[data-testid="city-name"]');
      await expect(cityName).toBeVisible();
      await expect(cityName).toHaveText(city);
      
      // Verify essential weather data elements
      await expect(page.locator('[data-testid="temperature-celsius"]')).toBeVisible();
      await expect(page.locator('[data-testid="temperature-fahrenheit"]')).toBeVisible();
      await expect(page.locator('[data-testid="humidity"]')).toBeVisible();
      await expect(page.locator('[data-testid="wind-speed"]')).toBeVisible();
      await expect(page.locator('[data-testid="weather-description"]')).toBeVisible();
      
      // Take desktop screenshot
      await page.screenshot({
        path: path.join(TEST_CONFIG.SCREENSHOT_DIR, `${city.toLowerCase()}-detail-page-desktop.png`),
        fullPage: true
      });
      
      // Take mobile screenshot
      await page.setViewportSize({ width: 375, height: 667 });
      await page.screenshot({
        path: path.join(TEST_CONFIG.SCREENSHOT_DIR, `${city.toLowerCase()}-detail-page-mobile.png`),
        fullPage: true
      });
      
      // Reset viewport for next iteration
      await page.setViewportSize({ width: 1280, height: 720 });
      
      console.log(`Completed testing ${city} detail page`);
    }
  });

  test('Navigation menu shows all cities', async ({ page }) => {
    console.log('Starting navigation test...');
    
    // Log all links for debugging
    const allLinks = await page.getByRole('link').all();
    const allLinkTexts = await Promise.all(allLinks.map(link => link.textContent()));
    console.log('All links found:', allLinkTexts);
    
    // Take screenshot of navigation
    await page.screenshot({
      path: path.join(TEST_CONFIG.SCREENSHOT_DIR, 'homepage-navigation.png'),
      fullPage: true
    });
    
    for (const city of POPULAR_CITIES) {
      const cityLink = await page.getByRole('link', { name: new RegExp(`^${city}`) }).first();
      await expect(cityLink).toBeVisible({
        timeout: TEST_CONFIG.TIMEOUT,
        message: `City link for ${city} should be visible`
      });
      
      const text = await cityLink.textContent();
      console.log(`Found link for ${city}: ${text}`);
    }
  });

  test('Quick navigation cities have weather data', async ({ page }) => {
    console.log('Starting quick nav cities test...');
    
    const citiesToTest = ['Sydney', 'Berlin', 'Toronto'];
    
    for (const city of citiesToTest) {
      console.log(`Testing ${city}...`);
      const cityElement = await page.getByRole('link', { name: new RegExp(`^${city}`) }).first();
      const weatherText = await cityElement.textContent();
      
      // Take screenshot for each city in quick nav
      await page.screenshot({
        path: path.join(TEST_CONFIG.SCREENSHOT_DIR, `${city.toLowerCase()}-quick-nav-weather.png`),
        fullPage: true
      });
      
      console.log(`${city} weather data: ${weatherText}`);
      
      expect(weatherText).toContain(city);
      expect(weatherText).toMatch(/\d+\.?\d*°C/);
      expect(weatherText).toMatch(/\d+\.?\d*°F/);
      expect(weatherText).toMatch(/Wind:/);
      expect(weatherText).toMatch(/Humidity:/);
    }
  });
});

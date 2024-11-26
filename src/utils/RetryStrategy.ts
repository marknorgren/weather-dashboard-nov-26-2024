export class RetryStrategy {
  private readonly maxAttempts: number;
  private readonly delayMs: number;

  constructor(maxAttempts: number, delayMs: number) {
    this.maxAttempts = maxAttempts;
    this.delayMs = delayMs;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt === this.maxAttempts) {
          break;
        }

        // Exponential backoff with jitter
        const jitter = Math.random() * 200;
        const delay = this.delayMs * Math.pow(2, attempt - 1) + jitter;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw new Error(
      `Operation failed after ${this.maxAttempts} attempts. Last error: ${lastError?.message}`
    );
  }
}

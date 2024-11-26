// TODO: This is a basic metrics implementation
// Candidates can suggest improvements:
// 1. Use a proper metrics system (Prometheus, DataDog, etc.)
// 2. Add metric types (histogram, gauge)
// 3. Add proper aggregation
// 4. Implement metric persistence
// 5. Add metric alerting

interface Timer {
  start: number;
  end: () => void;
}

export class MetricsService {
  private metrics: Map<string, number> = new Map();

  incrementCounter(metric: string): void {
    const current = this.metrics.get(metric) || 0;
    this.metrics.set(metric, current + 1);
  }

  startTimer(metric: string): Timer {
    const start = Date.now();
    return {
      start,
      end: () => {
        const duration = Date.now() - start;
        this.metrics.set(`${metric}_duration`, duration);
      },
    };
  }

  // Deliberately missing features
  // TODO: Add support for:
  // - Metric types (counter, gauge, histogram)
  // - Labels/tags
  // - Aggregation windows
  // - Export functionality
  // - Alert thresholds
}

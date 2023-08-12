import * as promBundle from 'express-prom-bundle';
export const metricsMiddleware = promBundle({ includeMethod: true });

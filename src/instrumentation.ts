export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { logger } = await import('./lib/logger');
    logger.info('Instrumentation hook registered and logger initialized.');

    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    const formatArg = (arg: unknown) => {
      if (arg instanceof Error) {
        return arg.stack || arg.message || String(arg);
      }
      if (typeof arg === 'object') {
        return JSON.stringify(arg);
      }
      return String(arg);
    };

    console.log = (...args: unknown[]) => {
      logger.info(args.map(formatArg).join(' '));
      originalLog.apply(console, args);
    };

    console.error = (...args: unknown[]) => {
      logger.error(args.map(formatArg).join(' '));
      originalError.apply(console, args);
    };

    console.warn = (...args: unknown[]) => {
      logger.warn(args.map(formatArg).join(' '));
      originalWarn.apply(console, args);
    };
  }
}

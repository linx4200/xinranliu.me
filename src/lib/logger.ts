import winston from 'winston';
import fs from 'fs';
import path from 'path';

const fallbackLogDirectory = path.join(process.cwd(), 'logs');
const configuredLogDirectory = process.env.LOG_DIRECTORY;

function resolveWritableLogDirectory() {
  if (process.env.VERCEL === '1' && !configuredLogDirectory) {
    return null;
  }

  const logDirectory = configuredLogDirectory ?? fallbackLogDirectory;

  try {
    fs.mkdirSync(logDirectory, { recursive: true });
    fs.accessSync(logDirectory, fs.constants.W_OK);
    return logDirectory;
  } catch (error) {
    console.warn(
      `File logging disabled. Could not write to ${logDirectory}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
    return null;
  }
}

const logDirectory = resolveWritableLogDirectory();

export const isFileLoggingEnabled = Boolean(logDirectory);

const transports = logDirectory
  ? [
      new winston.transports.File({
        filename: path.join(logDirectory, 'error.log'),
        level: 'error',
      }),
      new winston.transports.File({
        filename: path.join(logDirectory, 'combined.log'),
      }),
    ]
  : [new winston.transports.Console()];

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports,
});

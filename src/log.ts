import { LogColorMapType, LogLevel } from './types';
import chalk from 'chalk';

const getLogColorMap: LogColorMapType = {
  info: (s: string) => chalk.bgCyan(s),
  debug: (s: string) => chalk.bgMagenta(s),
  warn: (s: string) => chalk.bgYellow(s),
  error: (s: string) => chalk.bgRed(s),
  bright: (s: string) => chalk.bgGreenBright(s)
} as const;

export function log(logLevel: LogLevel, msg: string) {
  console.log(
    getLogColorMap[logLevel](
      `${logLevel}: msg={${msg}} emitTime={${new Date().toISOString()}}`
    )
  );
}

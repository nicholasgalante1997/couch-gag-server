import { LogLevel } from "./types";

export function log(logLevel: LogLevel, msg: string) {
  console.log(
    `${logLevel}: msg={${msg}} emitTime={${new Date().toISOString()}}`
  );
}

import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

const logFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return stack
    ? `${ts} [${level}] ${message}\n${stack}`
    : `${ts} [${level}] ${message}`;
});

const logger = createLogger({
  level: process.env["NODE_ENV"] === "production" ? "info" : "debug",
  format: combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat,
  ),
  transports: [new transports.Console()],
});

export default logger;

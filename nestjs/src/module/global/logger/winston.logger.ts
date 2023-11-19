import { isProduction } from "@src/util/env.util";
import { transports, format, createLogger } from "winston";

const winstonConfig = {
  level: isProduction() ? "warn" : "debug",
  transports: [
    new transports.File({
      filename: `.log/${new Date().toISOString().substring(0, 10)}_error.log`,
      level: "info",
    }),
  ],
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      (info) => `[${info.timestamp}] [${info.level}]: ${info.message}`,
    ),
  ),
};

const logger = createLogger(winstonConfig);

if (!isProduction()) {
  logger.add(new transports.Console());
}

export default logger;

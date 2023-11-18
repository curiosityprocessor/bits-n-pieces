import { transports, format, createLogger } from "winston";

const winstonConfig = {
  level: "info",
  transports: [
    new transports.File({
      filename: `${new Date().toISOString().substring(0, 10)}_error.log`,
      level: "info",
    }),
  ],
  format: format.json(),
};

const logger = createLogger(winstonConfig);

export default logger;

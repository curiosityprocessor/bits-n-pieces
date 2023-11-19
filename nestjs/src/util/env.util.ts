import * as dotenv from "dotenv";
dotenv.config();

export const getEnv = (key: string) => {
  const matching = process.env[key];
  if (!matching) {
    throw new Error(`environment variable [${key}] is not set`);
  }

  return matching;
};

export const isProduction = () => getEnv("NODE_ENV") === "production";

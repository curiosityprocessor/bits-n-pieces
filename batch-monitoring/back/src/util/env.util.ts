import * as dotenv from "dotenv";
dotenv.config();

export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (value === undefined || value === "") {
    throw new Error(`Environment variable [${key}] is not set`);
  }
  return value;
};

export const getEnvOrDefault = (key: string, defaultValue: string): string =>
  process.env[key] ?? defaultValue;

export const isProduction = (): boolean => getEnv("NODE_ENV") === "production";
export const isNotProduction = (): boolean => !isProduction();

export const getEnv = (key: string) => {
  const matching = process.env[key];
  if (!matching) {
    throw new Error(`environment variable [${key}] is not set`);
  }

  return matching;
};

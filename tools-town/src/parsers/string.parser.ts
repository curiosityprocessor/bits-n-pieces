import { isEmpty } from "../validators/empty.validator";

export const DEFAULT_STRING_VALUE = "";

export const toStr = (data?: unknown): string => {
  if (typeof data === "string") {
    return data;
  }

  if (isEmpty(data)) {
    return DEFAULT_STRING_VALUE;
  }

  if (typeof data === "object") {
    if (data instanceof Date) {
      return data.toISOString();
    }
    return JSON.stringify(data);
  }

  return data!.toString();
};

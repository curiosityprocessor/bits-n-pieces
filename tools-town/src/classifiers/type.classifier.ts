export type DETAILED_TYPES =
  | "string"
  | "number"
  | "boolean"
  | "object"
  | "undefined"
  | "null"
  | "array"
  | "date";

export const getDetailedType = (data?: unknown): DETAILED_TYPES => {
  if (data === null) {
    return "null";
  }

  if (data === undefined) {
    return "undefined";
  }

  if (Array.isArray(data)) {
    return "array";
  }

  if (data instanceof Date) {
    return "date";
  }

  return typeof data as "number" | "string" | "boolean";
};

export const TYPES = {
  STRING: "string",
  BOOLEAN: "boolean",
  NUMBER: "number",
  OBJECT: "object",
  UNDEFINED: "undefined",
  FUNCTION: "function",
} as const;

export const TEST_VARS = {
  NULLISH: {
    NULL: null,
    UNDEFINED: undefined,
  },
  BOOLEAN: { TRUE: true, FALSE: false },
  NUMBER: {
    VALID: 0,
    NAN: NaN,
  },
  STRING: {
    PLAIN: "string",
    JSON_ARRAY: "[1,2,3]",
    JSON_OBJECT: `{"key1":"value1"}`,
  },
  DATE: {
    VALID: new Date(),
    INVALID: new Date(NaN),
  },
  ARRAY: [1, 2, 3],
  OBJECT: { key1: "value1" },
};

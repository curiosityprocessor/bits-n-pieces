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
    ZERO: 0,
    POSITIVE: 1,
    NEGATIVE: -1,
    NAN: NaN,
  },
  STRING: {
    EMPTY: "",
    BLANK: " ",
    TRAILING: " string ",
    PLAIN: "string",
    JSON_ARRAY: "[1,2,3]",
    JSON_OBJECT: `{"key1":"value1"}`,
  },
  DATE: {
    VALID: new Date(),
    INVALID: new Date(NaN),
  },
  ARRAY: {
    EMPTY: [],
    NESTED_EMPTY: [null, undefined, {}, []],
    PARTIALLY_EMPTY: [false, null, { key1: "string" }],
    NON_EMPTY: [false, 0, "string", { key1: "string" }],
    PLAIN: [1, 2, 3],
  },
  OBJECT: {
    EMPTY: {},
    NESTED_EMPTY: { key1: null, key2: undefined, key3: {}, key4: [] },
    VALUELESS: { key1: undefined },
    PARTIALLY_EMPTY: { key1: "string", key2: undefined },
    NON_EMPTY: { key1: false, key2: 0, key3: "string", key4: [1, 2, 3] },
    PLAIN: { key1: "value1" },
  },
};

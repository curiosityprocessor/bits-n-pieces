import {
  isAnyEmpty,
  isEmpty,
  isNotEmpty,
} from "../../src/validators/empty.validator";

const TEST_VARS = {
  NULLISH: {
    NULL: null,
    UNDEFINED: undefined,
  },
  BOOLEAN: {
    TRUE: true,
    FALSE: false,
  },
  DATE: new Date(),
  NUMBER: {
    ZERO: 0,
    POSITIVE: 1,
    NEGATIVE: -1,
  },
  STRING: {
    EMPTY: "",
    BLANK: " ",
    TRAILING: " string ",
    NON_EMPTY: "string",
  },
  OBJECT: {
    EMPTY: {},
    NESTED_EMPTY: { key1: null, key2: undefined, key3: {}, key4: [] },
    VALUELESS: { key1: undefined },
    PARTIALLY_EMPTY: { key1: "string", key2: undefined },
    NON_EMPTY: { key1: false, key2: 0, key3: "string", key4: [1, 2, 3] },
  },
  ARRAY: {
    EMPTY: [],
    NESTED_EMPTY: [null, undefined, {}, []],
    PARTIALLY_EMPTY: [false, null, { key1: "string" }],
    NON_EMPTY: [false, 0, "string", { key1: "string" }],
  },
};

describe(`Module::validators > empty.validator.ts`, () => {
  describe(`Function::isEmpty()`, () => {
    test("null or undefined is empty", () => {
      expect(isEmpty(TEST_VARS.NULLISH.NULL)).toBe(true);
      expect(isEmpty(TEST_VARS.NULLISH.UNDEFINED)).toBe(true);
      expect(isEmpty()).toBe(true);
    });

    test("primitive types ['boolean', 'number'] and instances of 'date' are not empty", () => {
      expect(isEmpty(TEST_VARS.BOOLEAN.TRUE)).toBe(false);
      expect(isEmpty(TEST_VARS.BOOLEAN.FALSE)).toBe(false);
      expect(isEmpty(TEST_VARS.NUMBER.ZERO)).toBe(false);
      expect(isEmpty(TEST_VARS.NUMBER.POSITIVE)).toBe(false);
      expect(isEmpty(TEST_VARS.NUMBER.NEGATIVE)).toBe(false);
      expect(isEmpty(TEST_VARS.DATE)).toBe(false);
    });

    test("white-space or blank only string is empty", () => {
      expect(isEmpty(TEST_VARS.STRING.EMPTY)).toBe(true);
      expect(isEmpty(TEST_VARS.STRING.BLANK)).toBe(true);
      expect(isEmpty(TEST_VARS.STRING.TRAILING)).toBe(false);
      expect(isEmpty(TEST_VARS.STRING.NON_EMPTY)).toBe(false);
    });

    describe("an object is empty when;", () => {
      test("there are no key-value pairs", () => {
        expect(isEmpty(TEST_VARS.OBJECT.EMPTY)).toBe(true);
        expect(isEmpty(TEST_VARS.OBJECT.VALUELESS)).toBe(true);
        expect(isEmpty(TEST_VARS.OBJECT.NON_EMPTY)).toBe(false);
      });
      test("all of its property are recursively `isEmpty()`", () => {
        expect(isEmpty(TEST_VARS.OBJECT.NESTED_EMPTY)).toBe(true);
        expect(isEmpty(TEST_VARS.OBJECT.PARTIALLY_EMPTY)).toBe(false);
        expect(isEmpty(TEST_VARS.OBJECT.NON_EMPTY)).toBe(false);
      });
    });

    describe("an array is empty when;", () => {
      test("its length is 0", () => {
        expect(isEmpty(TEST_VARS.ARRAY.EMPTY)).toBe(true);
        expect(isEmpty(TEST_VARS.ARRAY.NON_EMPTY)).toBe(false);
      });

      test("all of its property are recursively `isEmpty()`", () => {
        expect(isEmpty(TEST_VARS.ARRAY.NESTED_EMPTY)).toBe(true);
        expect(isEmpty(TEST_VARS.ARRAY.PARTIALLY_EMPTY)).toBe(false);
        expect(isEmpty(TEST_VARS.ARRAY.NON_EMPTY)).toBe(false);
      });
    });
  });

  describe(`Function::isNotEmpty()`, () => {
    test("`isNotEmpty()` is a negation of `isEmpty()`", () => {
      // nullish
      expect(isNotEmpty(TEST_VARS.NULLISH.NULL)).toBe(
        !isEmpty(TEST_VARS.NULLISH.NULL),
      );
      expect(isNotEmpty(TEST_VARS.NULLISH.UNDEFINED)).toBe(
        !isEmpty(TEST_VARS.NULLISH.UNDEFINED),
      );
      expect(isNotEmpty()).toBe(!isEmpty());

      // types
      expect(isNotEmpty(TEST_VARS.BOOLEAN.TRUE)).toBe(
        !isEmpty(TEST_VARS.BOOLEAN.TRUE),
      );
      expect(isNotEmpty(TEST_VARS.BOOLEAN.FALSE)).toBe(
        !isEmpty(TEST_VARS.BOOLEAN.FALSE),
      );
      expect(isNotEmpty(TEST_VARS.NUMBER.ZERO)).toBe(
        !isEmpty(TEST_VARS.NUMBER.ZERO),
      );
      expect(isNotEmpty(TEST_VARS.NUMBER.POSITIVE)).toBe(
        !isEmpty(TEST_VARS.NUMBER.POSITIVE),
      );
      expect(isNotEmpty(TEST_VARS.NUMBER.NEGATIVE)).toBe(
        !isEmpty(TEST_VARS.NUMBER.NEGATIVE),
      );
      expect(isNotEmpty(TEST_VARS.DATE)).toBe(!isEmpty(TEST_VARS.DATE));

      // strings
      expect(isNotEmpty(TEST_VARS.STRING.EMPTY)).toBe(
        !isEmpty(TEST_VARS.STRING.EMPTY),
      );
      expect(isNotEmpty(TEST_VARS.STRING.BLANK)).toBe(
        !isEmpty(TEST_VARS.STRING.BLANK),
      );
      expect(isNotEmpty(TEST_VARS.STRING.TRAILING)).toBe(
        !isEmpty(TEST_VARS.STRING.TRAILING),
      );
      expect(isNotEmpty(TEST_VARS.STRING.NON_EMPTY)).toBe(
        !isEmpty(TEST_VARS.STRING.NON_EMPTY),
      );

      // objects
      expect(isNotEmpty(TEST_VARS.OBJECT.EMPTY)).toBe(
        !isEmpty(TEST_VARS.OBJECT.EMPTY),
      );
      expect(isNotEmpty(TEST_VARS.OBJECT.VALUELESS)).toBe(
        !isEmpty(TEST_VARS.OBJECT.VALUELESS),
      );
      expect(isNotEmpty(TEST_VARS.OBJECT.NESTED_EMPTY)).toBe(
        !isEmpty(TEST_VARS.OBJECT.NESTED_EMPTY),
      );
      expect(isNotEmpty(TEST_VARS.OBJECT.PARTIALLY_EMPTY)).toBe(
        !isEmpty(TEST_VARS.OBJECT.PARTIALLY_EMPTY),
      );
      expect(isNotEmpty(TEST_VARS.OBJECT.NON_EMPTY)).toBe(
        !isEmpty(TEST_VARS.OBJECT.NON_EMPTY),
      );

      // arrays
      expect(isNotEmpty(TEST_VARS.ARRAY.EMPTY)).toBe(
        !isEmpty(TEST_VARS.ARRAY.EMPTY),
      );
      expect(isNotEmpty(TEST_VARS.ARRAY.NESTED_EMPTY)).toBe(
        !isEmpty(TEST_VARS.ARRAY.NESTED_EMPTY),
      );
      expect(isNotEmpty(TEST_VARS.ARRAY.PARTIALLY_EMPTY)).toBe(
        !isEmpty(TEST_VARS.ARRAY.PARTIALLY_EMPTY),
      );
      expect(isNotEmpty(TEST_VARS.ARRAY.NON_EMPTY)).toBe(
        !isEmpty(TEST_VARS.ARRAY.NON_EMPTY),
      );
    });
  });

  describe(`Function::isAnyEmpty()`, () => {
    test("invoking `isAnyEmpty()` with single parameter works the same as `isEmpty()`", () => {
      // nullish
      expect(isAnyEmpty(TEST_VARS.NULLISH.NULL)).toBe(
        isEmpty(TEST_VARS.NULLISH.NULL),
      );
      expect(isAnyEmpty(TEST_VARS.NULLISH.UNDEFINED)).toBe(
        isEmpty(TEST_VARS.NULLISH.UNDEFINED),
      );

      // types
      expect(isAnyEmpty(TEST_VARS.BOOLEAN.TRUE)).toBe(
        isEmpty(TEST_VARS.BOOLEAN.TRUE),
      );
      expect(isAnyEmpty(TEST_VARS.BOOLEAN.FALSE)).toBe(
        isEmpty(TEST_VARS.BOOLEAN.FALSE),
      );
      expect(isAnyEmpty(TEST_VARS.NUMBER.ZERO)).toBe(
        isEmpty(TEST_VARS.NUMBER.ZERO),
      );
      expect(isAnyEmpty(TEST_VARS.NUMBER.POSITIVE)).toBe(
        isEmpty(TEST_VARS.NUMBER.POSITIVE),
      );
      expect(isAnyEmpty(TEST_VARS.NUMBER.NEGATIVE)).toBe(
        isEmpty(TEST_VARS.NUMBER.NEGATIVE),
      );
      expect(isAnyEmpty(TEST_VARS.DATE)).toBe(isEmpty(TEST_VARS.DATE));

      // string
      expect(isAnyEmpty(TEST_VARS.STRING.EMPTY)).toBe(
        isEmpty(TEST_VARS.STRING.EMPTY),
      );
      expect(isAnyEmpty(TEST_VARS.STRING.BLANK)).toBe(
        isEmpty(TEST_VARS.STRING.BLANK),
      );
      expect(isAnyEmpty(TEST_VARS.STRING.TRAILING)).toBe(
        isEmpty(TEST_VARS.STRING.TRAILING),
      );
      expect(isAnyEmpty(TEST_VARS.STRING.NON_EMPTY)).toBe(
        isEmpty(TEST_VARS.STRING.NON_EMPTY),
      );

      // object
      expect(isAnyEmpty(TEST_VARS.OBJECT.EMPTY)).toBe(
        isEmpty(TEST_VARS.OBJECT.EMPTY),
      );
      expect(isAnyEmpty(TEST_VARS.OBJECT.VALUELESS)).toBe(
        isEmpty(TEST_VARS.OBJECT.VALUELESS),
      );
      expect(isAnyEmpty(TEST_VARS.OBJECT.NESTED_EMPTY)).toBe(
        isEmpty(TEST_VARS.OBJECT.NESTED_EMPTY),
      );
      expect(isAnyEmpty(TEST_VARS.OBJECT.PARTIALLY_EMPTY)).toBe(
        isEmpty(TEST_VARS.OBJECT.PARTIALLY_EMPTY),
      );
      expect(isAnyEmpty(TEST_VARS.OBJECT.NON_EMPTY)).toBe(
        isEmpty(TEST_VARS.OBJECT.NON_EMPTY),
      );

      // array
      expect(isAnyEmpty(TEST_VARS.ARRAY.EMPTY)).toBe(
        isEmpty(TEST_VARS.ARRAY.EMPTY),
      );
      expect(isAnyEmpty(TEST_VARS.ARRAY.NESTED_EMPTY)).toBe(
        isEmpty(TEST_VARS.ARRAY.NESTED_EMPTY),
      );
      expect(isAnyEmpty(TEST_VARS.ARRAY.PARTIALLY_EMPTY)).toBe(
        isEmpty(TEST_VARS.ARRAY.PARTIALLY_EMPTY),
      );
      expect(isAnyEmpty(TEST_VARS.ARRAY.NON_EMPTY)).toBe(
        isEmpty(TEST_VARS.ARRAY.NON_EMPTY),
      );
    });

    test("`isAnyEmpty()` with multiple parameter returns true when one or more of its parameters are `isEmpty()`", () => {
      expect(isAnyEmpty(...TEST_VARS.ARRAY.PARTIALLY_EMPTY)).toBe(true);
      expect(isAnyEmpty(...TEST_VARS.ARRAY.NESTED_EMPTY)).toBe(true);
      expect(isAnyEmpty(...TEST_VARS.ARRAY.NON_EMPTY)).toBe(false);
    });
  });

  describe(`Function::isNoneEmpty()`, () => {});
});

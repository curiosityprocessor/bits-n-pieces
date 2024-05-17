import {
  isAnyEmpty,
  isEmpty,
  isNoneEmpty,
  isNotEmpty,
} from "../../src/validators/empty.validator";
import { TEST_VARS } from "../test.constants";

describe(`Function::${isEmpty.name}()`, () => {
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
    expect(isEmpty(TEST_VARS.STRING.PLAIN)).toBe(false);
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

describe(`Function::${isNotEmpty.name}()`, () => {
  test(`\`${isNotEmpty.name}()\` is a negation of \`${isEmpty.name}()\``, () => {
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
    expect(isNotEmpty(TEST_VARS.STRING.PLAIN)).toBe(
      !isEmpty(TEST_VARS.STRING.PLAIN),
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

describe(`Function::${isAnyEmpty.name}()`, () => {
  test(`invoking \`${isAnyEmpty.name}()\` with single parameter works the same as \`${isEmpty.name}()\``, () => {
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
    expect(isAnyEmpty(TEST_VARS.STRING.PLAIN)).toBe(
      isEmpty(TEST_VARS.STRING.PLAIN),
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

  test(`\`${isAnyEmpty.name}()\` with multiple parameters returns true when one or more of its parameters are \`${isEmpty.name}()\``, () => {
    expect(isAnyEmpty(...TEST_VARS.ARRAY.PARTIALLY_EMPTY)).toBe(true);
    expect(isAnyEmpty(...TEST_VARS.ARRAY.NESTED_EMPTY)).toBe(true);
    expect(isAnyEmpty(...TEST_VARS.ARRAY.NON_EMPTY)).toBe(false);
  });
});

describe(`Function::${isNoneEmpty.name}()`, () => {
  test(`invoking \`${isNoneEmpty.name}()\` with single parameter works the same as \`${isNotEmpty.name}()\``, () => {
    // nullish
    expect(isNoneEmpty(TEST_VARS.NULLISH.NULL)).toBe(
      isNotEmpty(TEST_VARS.NULLISH.NULL),
    );
    expect(isNoneEmpty(TEST_VARS.NULLISH.UNDEFINED)).toBe(
      isNotEmpty(TEST_VARS.NULLISH.UNDEFINED),
    );

    // types
    expect(isNoneEmpty(TEST_VARS.BOOLEAN.TRUE)).toBe(
      isNotEmpty(TEST_VARS.BOOLEAN.TRUE),
    );
    expect(isNoneEmpty(TEST_VARS.BOOLEAN.FALSE)).toBe(
      isNotEmpty(TEST_VARS.BOOLEAN.FALSE),
    );
    expect(isNoneEmpty(TEST_VARS.NUMBER.ZERO)).toBe(
      isNotEmpty(TEST_VARS.NUMBER.ZERO),
    );
    expect(isNoneEmpty(TEST_VARS.NUMBER.POSITIVE)).toBe(
      isNotEmpty(TEST_VARS.NUMBER.POSITIVE),
    );
    expect(isNoneEmpty(TEST_VARS.NUMBER.NEGATIVE)).toBe(
      isNotEmpty(TEST_VARS.NUMBER.NEGATIVE),
    );
    expect(isNoneEmpty(TEST_VARS.DATE)).toBe(isNotEmpty(TEST_VARS.DATE));

    // string
    expect(isNoneEmpty(TEST_VARS.STRING.EMPTY)).toBe(
      isNotEmpty(TEST_VARS.STRING.EMPTY),
    );
    expect(isNoneEmpty(TEST_VARS.STRING.BLANK)).toBe(
      isNotEmpty(TEST_VARS.STRING.BLANK),
    );
    expect(isNoneEmpty(TEST_VARS.STRING.TRAILING)).toBe(
      isNotEmpty(TEST_VARS.STRING.TRAILING),
    );
    expect(isNoneEmpty(TEST_VARS.STRING.PLAIN)).toBe(
      isNotEmpty(TEST_VARS.STRING.PLAIN),
    );

    // object
    expect(isNoneEmpty(TEST_VARS.OBJECT.EMPTY)).toBe(
      isNotEmpty(TEST_VARS.OBJECT.EMPTY),
    );
    expect(isNoneEmpty(TEST_VARS.OBJECT.VALUELESS)).toBe(
      isNotEmpty(TEST_VARS.OBJECT.VALUELESS),
    );
    expect(isNoneEmpty(TEST_VARS.OBJECT.NESTED_EMPTY)).toBe(
      isNotEmpty(TEST_VARS.OBJECT.NESTED_EMPTY),
    );
    expect(isNoneEmpty(TEST_VARS.OBJECT.PARTIALLY_EMPTY)).toBe(
      isNotEmpty(TEST_VARS.OBJECT.PARTIALLY_EMPTY),
    );
    expect(isNoneEmpty(TEST_VARS.OBJECT.NON_EMPTY)).toBe(
      isNotEmpty(TEST_VARS.OBJECT.NON_EMPTY),
    );

    // array
    expect(isNoneEmpty(TEST_VARS.ARRAY.EMPTY)).toBe(
      isNotEmpty(TEST_VARS.ARRAY.EMPTY),
    );
    expect(isNoneEmpty(TEST_VARS.ARRAY.NESTED_EMPTY)).toBe(
      isNotEmpty(TEST_VARS.ARRAY.NESTED_EMPTY),
    );
    expect(isNoneEmpty(TEST_VARS.ARRAY.PARTIALLY_EMPTY)).toBe(
      isNotEmpty(TEST_VARS.ARRAY.PARTIALLY_EMPTY),
    );
    expect(isNoneEmpty(TEST_VARS.ARRAY.NON_EMPTY)).toBe(
      isNotEmpty(TEST_VARS.ARRAY.NON_EMPTY),
    );
  });

  test(`\`${isNoneEmpty.name}()\` with multiple parameters returns true when every one of its parameters are \`${isNotEmpty.name}()\``, () => {
    expect(isNoneEmpty(...TEST_VARS.ARRAY.PARTIALLY_EMPTY)).toBe(false);
    expect(isNoneEmpty(...TEST_VARS.ARRAY.NESTED_EMPTY)).toBe(false);
    expect(isNoneEmpty(...TEST_VARS.ARRAY.NON_EMPTY)).toBe(true);
  });
});

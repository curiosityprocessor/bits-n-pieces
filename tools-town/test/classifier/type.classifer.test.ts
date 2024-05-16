import { TEST_VARS, TYPES } from "../test.constants";
import { getDetailedType } from "../../src/classifiers/type.classifier";

describe(`Function::${getDetailedType.name}()`, () => {
  test("following primitive types are classified as is: ( undefined, string, number, boolean)", () => {
    expect(getDetailedType(undefined)).toBe(TYPES.UNDEFINED);
    expect(getDetailedType(TEST_VARS.STRING.PLAIN)).toBe(TYPES.STRING);
    expect(getDetailedType(TEST_VARS.STRING.EMPTY)).toBe(TYPES.STRING);
    expect(getDetailedType(TEST_VARS.NUMBER.ZERO)).toBe(TYPES.NUMBER);
    expect(getDetailedType(TEST_VARS.NUMBER.NAN)).toBe(TYPES.NUMBER);
    expect(getDetailedType(TEST_VARS.BOOLEAN.TRUE)).toBe(TYPES.BOOLEAN);
  });

  test("null is classified as 'null'", () => {
    expect(getDetailedType(TEST_VARS.NULLISH.NULL)).toBe("null");
  });

  describe("objects are classified into:", () => {
    test("arrays are classified as 'array'", () => {
      expect(getDetailedType(TEST_VARS.ARRAY.PLAIN)).toBe("array");
      expect(getDetailedType(TEST_VARS.ARRAY.EMPTY)).toBe("array");
    });

    test("instances of Date are classified as 'date'", () => {
      expect(getDetailedType(TEST_VARS.DATE.INVALID)).toBe("date");
      expect(getDetailedType(TEST_VARS.DATE.VALID)).toBe("date");
    });

    test("others are classifed as is 'object'", () => {
      expect(getDetailedType(TEST_VARS.OBJECT.PLAIN)).toBe(TYPES.OBJECT);
      expect(getDetailedType(TEST_VARS.OBJECT.NESTED_EMPTY)).toBe(TYPES.OBJECT);
      expect(getDetailedType(TEST_VARS.OBJECT.EMPTY)).toBe(TYPES.OBJECT);
    });
  });
});

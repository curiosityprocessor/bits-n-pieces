import { DEFAULT_STRING_VALUE, toStr } from "../../src/parsers/string.parser";
import { TEST_VARS, TYPES } from "../test.constants";

describe("Module::parsers > string.parser.ts", () => {
  describe("Function::toStr()", () => {
    test("parsing string type results in type and value of original string", () => {
      const parsed = toStr(TEST_VARS.STRING.PLAIN);
      expect(typeof parsed).toBe(TYPES.STRING);
      expect(parsed).toBe(TEST_VARS.STRING.PLAIN);
    });

    describe("parsing nullish values:", () => {
      test("nullish values results in default string `''`", () => {
        expect(toStr(TEST_VARS.NULLISH.NULL)).toBe(DEFAULT_STRING_VALUE);
        expect(toStr(TEST_VARS.NULLISH.UNDEFINED)).toBe(DEFAULT_STRING_VALUE);
      });
    });

    test("parsing boolean results in string representation of the value", () => {
      const parsedTrue = toStr(TEST_VARS.BOOLEAN.TRUE);
      expect(typeof parsedTrue).toBe(TYPES.STRING);
      expect(parsedTrue).toBe(TEST_VARS.BOOLEAN.TRUE.toString());

      const parsedFalse = toStr(TEST_VARS.BOOLEAN.FALSE);
      expect(typeof parsedFalse).toBe(TYPES.STRING);
      expect(parsedFalse).toBe(TEST_VARS.BOOLEAN.FALSE.toString());
    });

    test("parsing number (valid, or NaN) results in string representation of the value", () => {
      const valid = toStr(TEST_VARS.NUMBER.ZERO);
      expect(typeof valid).toBe(TYPES.STRING);
      expect(valid).toEqual(TEST_VARS.NUMBER.ZERO.toString());
      const nan = toStr(TEST_VARS.NUMBER.NAN);
      expect(typeof nan).toBe(TYPES.STRING);
      expect(nan).toEqual(TEST_VARS.NUMBER.NAN.toString());
    });

    describe("parsing instances of Date:", () => {
      test("valid Date value results in ISO 8601 UTC formatted string", () => {
        const parsed = toStr(TEST_VARS.DATE.VALID);
        expect(typeof parsed).toBe(TYPES.STRING);
        expect(parsed).toBe(TEST_VARS.DATE.VALID.toISOString());
      });

      test("invalid Date value results in error thrown", () => {
        expect(() => {
          toStr(TEST_VARS.DATE.INVALID);
        }).toThrow();
      });
    });

    describe("parsing object types:", () => {
      test("arrays and objects results in JSON string", () => {
        const parsedArray = toStr(TEST_VARS.ARRAY.PLAIN);
        expect(typeof parsedArray).toBe(TYPES.STRING);
        expect(parsedArray).toBe(TEST_VARS.STRING.JSON_ARRAY);

        const parsedObject = toStr(TEST_VARS.OBJECT.PLAIN);
        expect(typeof parsedObject).toBe(TYPES.STRING);
        expect(parsedObject).toBe(TEST_VARS.STRING.JSON_OBJECT);
      });
    });
  });
});

import { DEFAULT_NUMBER_VALUE, toNum } from "../../src/parsers/number.parser";
import { TEST_VARS, TYPES } from "../test.constants";

describe("Module::parsers > number.parser.ts", () => {
  describe("Function::toNum()", () => {
    test("parsing number (valid, or NaN) results in type and value of original number", () => {
      const valid = toNum(TEST_VARS.NUMBER.ZERO);
      expect(typeof valid).toBe(TYPES.NUMBER);
      expect(valid).toBe(TEST_VARS.NUMBER.ZERO);
      const nan = toNum(TEST_VARS.NUMBER.NAN);
      expect(typeof nan).toBe(TYPES.NUMBER);
      expect(nan).toBe(TEST_VARS.NUMBER.NAN);
    });

    describe("parsing empty values:", () => {
      test(`empty values results in default number ${DEFAULT_NUMBER_VALUE}`, () => {
        expect(toNum(TEST_VARS.NULLISH.NULL)).toBe(DEFAULT_NUMBER_VALUE);
        expect(toNum(TEST_VARS.NULLISH.UNDEFINED)).toBe(DEFAULT_NUMBER_VALUE);
        expect(toNum(TEST_VARS.STRING.BLANK)).toBe(DEFAULT_NUMBER_VALUE);
        expect(toNum(TEST_VARS.ARRAY.EMPTY)).toBe(DEFAULT_NUMBER_VALUE);
        expect(toNum(TEST_VARS.OBJECT.EMPTY)).toBe(DEFAULT_NUMBER_VALUE);
      });
    });

    describe("parsing strings:", () => {
      test("parsing numeric string results in numeric representation of the value", () => {
        const parsed = toNum(TEST_VARS.STRING.NUMERIC);
        expect(typeof parsed).toBe(TYPES.NUMBER);
        expect(parsed).toBe(+TEST_VARS.STRING.NUMERIC);

        const parsedPadded = toNum(TEST_VARS.STRING.NUMERIC_LPAD);
        expect(typeof parsedPadded).toBe(TYPES.NUMBER);
        expect(parsedPadded).toBe(+TEST_VARS.STRING.NUMERIC_LPAD);
        expect(parsedPadded).toBe(+parsed);
      });

      test("parsing non-numeric string result in error thrown", () => {
        expect(() => {
          toNum(TEST_VARS.STRING.PLAIN);
        }).toThrow();
        expect(() => {
          toNum(TEST_VARS.STRING.JSON_ARRAY);
        }).toThrow();
        expect(() => {
          toNum(TEST_VARS.STRING.JSON_OBJECT);
        }).toThrow();
      });
    });

    test("parsing boolean results in numeric representation of the value", () => {
      const parsedTrue = toNum(TEST_VARS.BOOLEAN.TRUE);
      expect(typeof parsedTrue).toBe(TYPES.NUMBER);
      expect(parsedTrue).toBe(+TEST_VARS.BOOLEAN.TRUE);

      const parsedFalse = toNum(TEST_VARS.BOOLEAN.FALSE);
      expect(typeof parsedFalse).toBe(TYPES.NUMBER);
      expect(parsedFalse).toBe(+TEST_VARS.BOOLEAN.FALSE);
    });

    describe("parsing instances of Date:", () => {
      test("valid Date value results in corresponding Unix timestamp, upto milliseconds", () => {
        const parsed = toNum(TEST_VARS.DATE.VALID);
        expect(typeof parsed).toBe(TYPES.NUMBER);
        expect(parsed).toBe(TEST_VARS.DATE.VALID.getTime());
      });

      test("invalid Date value results in error thrown", () => {
        expect(() => {
          toNum(TEST_VARS.DATE.INVALID);
        }).toThrow();
      });
    });

    describe("parsing object types:", () => {
      test("arrays and objects results in error thrown", () => {
        expect(() => {
          toNum(TEST_VARS.ARRAY.PLAIN);
        }).toThrow();
        expect(() => {
          toNum(TEST_VARS.OBJECT.PLAIN);
        }).toThrow();
      });
    });
  });
});

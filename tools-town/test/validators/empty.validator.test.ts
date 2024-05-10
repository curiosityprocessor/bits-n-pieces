import { isEmpty } from "../../src/validators/empty.validator";

describe(`Module::validators > empty.validator.ts`, () => {
  describe(`Function::isEmpty()`, () => {
    test("null or undefined is empty", () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty()).toBe(true);
    });

    test("primitive types ['boolean', 'number'] and instances of 'date' are not empty", () => {
      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty(0)).toBe(false);
      expect(isEmpty(1)).toBe(false);
      expect(isEmpty(-1)).toBe(false);
      expect(isEmpty(new Date())).toBe(false);
    });

    test("white-space or blank string is empty", () => {
      expect(isEmpty("")).toBe(true);
      expect(isEmpty(" ")).toBe(true);
      expect(isEmpty(" string ")).toBe(false);
    });

    describe("an object is empty when;", () => {
      test("there are no key-value pairs", () => {
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({ key1: "val1" })).toBe(false);
      });
      test("all of its property are recursively `isEmpty()`", () => {
        expect(isEmpty({})).toBe(true);
        expect(
          isEmpty({ key1: null, key2: undefined, key3: {}, key4: [] }),
        ).toBe(true);
        expect(isEmpty({ key1: "val1", key2: undefined })).toBe(false);
        expect(isEmpty({ key1: "val1" })).toBe(false);
      });
    });

    describe("an array is empty when;", () => {
      test("its length is 0", () => {
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([0])).toBe(false);
      });

      test("all of its property are recursively `isEmpty()`", () => {
        expect(isEmpty([null, undefined])).toBe(true);
        expect(isEmpty([null, " "])).toBe(true);
        expect(isEmpty([null, {}, []])).toBe(true);
        expect(isEmpty([null, 1])).toBe(false);
        expect(isEmpty([0])).toBe(false);
      });
    });
  });
});

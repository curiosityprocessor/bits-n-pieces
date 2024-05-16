import { getDetailedType } from "../classifiers/type.classifier";
import { isEmpty } from "../validators/empty.validator";

export const DEFAULT_NUMBER_VALUE = 0;

export const toNum = (data?: unknown): number => {
  if (typeof data === "number") {
    return data;
  }

  if (isEmpty(data)) {
    return DEFAULT_NUMBER_VALUE;
  }

  try {
    const parsable = Number.isFinite(Number(data));
    if (parsable) {
      return Number(data);
    } else {
      throw new Error();
    }
  } catch (error) {
    throw new Error(
      `Failed to parse into number from data '${
        !!data ? JSON.stringify(data) : data
      }' of type ${getDetailedType(data)}`,
    );
  }
};

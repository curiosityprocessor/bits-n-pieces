export const isEmpty = (data?: unknown): boolean => {
  if (data == null) {
    return true;
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return true;
    }
    return !data.some((e) => !isEmpty(e));
  }

  if (data instanceof Date) {
    return false;
  }

  if (typeof data === "object") {
    return !Object.values(data).some((e) => !isEmpty(e));
  } else if (typeof data === "string") {
    return !data.trim();
  } else {
    return false;
  }
};

export const isNotEmpty = (data?: unknown): boolean => !isEmpty(data);

export const isAnyEmpty = (...data: unknown[]): boolean =>
  data.some((e) => isEmpty(e));
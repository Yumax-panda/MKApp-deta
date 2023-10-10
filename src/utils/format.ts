function isDate(date: any) {
  return (
    new Date(date).toString() !== "Invalid Date" && !isNaN(Date.parse(date))
  );
}

export function format<T>(obj: Record<string, any>): T {
  for (const [key, value] of Object.entries(obj)) {
    if (value === null) {
      delete obj[key];
    }

    if (isDate(value)) {
      obj[key] = new Date(value);
    }
  }

  return obj as T;
}

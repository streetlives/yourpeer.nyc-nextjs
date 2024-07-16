"use client";

export function parseCookies(): Record<string, string> {
  return (
    document.cookie
      .split(";")
      // Map over the array of key-value pairs and split each pair into an array of key and value
      .map((v) => v.split("="))
      .filter((v) => v.length === 2)
      // Reduce the array of key-value arrays into an object
      .reduce(
        (acc, v) => {
          // Decode and trim the key and value, then assign them as properties to the accumulator object
          acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
            v[1].trim(),
          );
          return acc;
        },
        {} as Record<string, string>,
      )
  );
}

export function serializeCookies(
  parsedCookies: Record<string, string>,
): string {
  return Object.entries(parsedCookies)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join(";");
}

export function setCookie(key: string, value: string): void {
  document.cookie = `${key}=${value}`;
}

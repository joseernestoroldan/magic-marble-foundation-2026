/**
 * Parses an ISO date string and returns a formatted date object.
 * Uses UTC to avoid timezone offset issues.
 *
 * @param stringDate - An ISO 8601 date string (e.g. "2026-05-06T12:00:00Z")
 * @returns An object with `day`, `month` (full name), and `year` as strings.
 */
export const formatDate = (stringDate: string) => {
  const date = new Date(stringDate);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = date.toLocaleDateString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = String(date.getUTCFullYear());
  return { day, month, year };
};

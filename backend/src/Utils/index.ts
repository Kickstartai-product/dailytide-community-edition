import crypto from "crypto";

// get Source from enums
export function getSource(source: string) {
  switch (source.trim().toLowerCase()) {
    case "news":
      return "News";
    case "reddit":
      return "Reddit";
    case "arxiv":
      return "ArXiv";
    case "podcast":
      return "Podcast";
    case "x":
      return "X";
    default:
      return "";
  }
}

export function getStartAndEndDates(date: Date): { startOfDay: Date; endOfDay: Date } {
  const startOfDay = new Date(date);
  startOfDay.setDate(date.getDate() + 1); // topics are generated a day ahead
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setDate(date.getDate() + 1); // topics are generated a day ahead
  endOfDay.setHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
}

// Check if value is in enum
export function isInEnum<T>(value: T, enumType: { [key: string]: T }): boolean {
  return Object.values(enumType).includes(value);
}

export function computeEmailHash(email: string) {
  const sha256 = crypto.createHash("sha256");
  return sha256.update(email).digest("hex");
}

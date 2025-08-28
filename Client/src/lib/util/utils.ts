import { format, formatDistanceToNow, isValid, parseISO } from "date-fns";
import z from "zod";

export function formatDate(
  date: Date | string | number | null | undefined
): string {
  let parsed: Date | null = null;

  if (typeof date === "string") {
    parsed = parseISO(date); // ✅ safely parse ISO string
  } else if (typeof date === "number") {
    parsed = new Date(date); // ✅ handle timestamp
  } else {
    parsed = date ?? null;   // ✅ keep Date or null
  }

  if (!parsed || !isValid(parsed)) {
    return "Invalid date";
  }

  return format(parsed, "dd MMM yyyy h:mm a");
}

export function timeAgo(date: Date | string | number): string {
  let parsed: Date;

  if (typeof date === "string") {
    parsed = parseISO(date);
  } else if (typeof date === "number") {
    parsed = new Date(date);
  } else {
    parsed = date;
  }

  if (!isValid(parsed)) return "Invalid date";

  return formatDistanceToNow(parsed) + " ago";
}

// ✅ Reusable zod helper
export const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

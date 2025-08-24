import { format, isValid } from "date-fns";
import z from "zod";
export function formatDate(
  date: Date | string | number | null | undefined
): string {
  const parsed =
    typeof date === "string" || typeof date === "number"
      ? new Date(date)
      : date;
  if (!parsed || !isValid(parsed)) {
    return "Invalid date";
  }
  return format(parsed, "dd MMM yyyy h:mm a");
}
// export const requiredString = (fieldName: string) => z
// .string().min(2, { message: `${fieldName} is required` });

export const requiredString = (fieldName: string) =>
  z
    .string({ required_error: `${fieldName} is required` })
    .min(1, { message: `${fieldName} is required` });

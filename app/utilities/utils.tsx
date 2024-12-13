import { format } from "date-fns";
import moment from "moment";

function formatToISODate(dateString: string | any): any {
  const date = moment.parseZone(
    dateString,
    [
      "MM/DD/YYYY",
      "YYYY/MM/DD",
      "YYYY-MM-DD",
      "MM-DD-YYYY",
      "MM/DD/YY",
      "MM/D/YY",
      "M/D/YY",
      "DD-MMM-YYYY",
      "DDD-MMM-YYYY",
      "DDD-MMM-YY",
    ]
  );
  return date.isValid() ? date.toISOString() : null;
}

function formatFromISODate(isoDate: string, dateFormat: string): string {
  const date = new Date(isoDate); // Parse ISO string
  return format(date, dateFormat); // Format using date-fns
}

function formatPrice(total: string | undefined): number | null {
  if (!total) return null; // Handle undefined or empty string
  const cleaned = total.replace(/[^0-9.-]+/g, ""); // Remove non-numeric characters
  const parsed = parseFloat(cleaned); // Convert to floating-point number
  return isNaN(parsed) ? null : parsed; // Return null if parsing fails
}

export default {
  formatToISODate,
  formatPrice,
  formatFromISODate,
};

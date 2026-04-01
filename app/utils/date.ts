export function formatMonthYear(dateString: string | null): string | null {
  if (!dateString) return null;
  const date = new Date(`${dateString}T00:00:00`); // Ensure it's treated as UTC
  const formatter = new Intl.DateTimeFormat("es-MX", { month: "long", year: "numeric" });

  const formatted = formatter.format(date);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
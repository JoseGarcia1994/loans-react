export const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
};

export const formatWeekRange = (start, end) => {
  if (!start || !end) return "";
  const startDate = formatDate(start);
  const endDate = formatDate(end);
  const year = start.split("-")[0];
  return `${startDate} – ${endDate}, ${year}`;
};
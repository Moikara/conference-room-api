function parseDateTime(value) {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;
  if (!regex.test(value)) return null;

  const [datePart, timePart] = value.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const date = new Date(year, month - 1, day, hour, minute, 0, 0);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day ||
    date.getHours() !== hour ||
    date.getMinutes() !== minute
  ) {
    return null;
  }

  return date;
}

function isSameDay(start, end) {
  return (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate()
  );
}

function isInPast(date) {
  return date.getTime() < Date.now();
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

module.exports = {
  parseDateTime,
  isSameDay,
  isInPast,
  overlaps
};

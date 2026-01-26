function now() {
  return new Date(Date.now());
}

function minutesFromNow(minutes) {
  const d = now();
  d.setMinutes(d.getMinutes() + minutes);
  return d;
}

function hoursFromNow(hours) {
  const d = now();
  d.setHours(d.getHours() + hours);
  return d;
}

function atSameDay(hour, minute = 0) {
  const d = now();
  d.setHours(hour, minute, 0, 0);
  return d;
}

function toISO(date) {
  return date.toISOString().slice(0, 19);
}

module.exports = {
  now,
  minutesFromNow,
  hoursFromNow,
  atSameDay,
  toISO
};

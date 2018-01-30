export default function isHourAndMinutes(value: string) {
  const match = value.match(/^(\d){1,2}:(\d\d)$/);
  if (match) {
    const hours = Number(match[1]);
    const mins = Number(match[2]);
    if (hours >= 0 && hours <= 23 && mins >= 0 && mins <= 59) {
      return true;
    }
  }
  return false;
}
export const formatUptime = (input: string): [number, number, number] => {
  let days = 0,
    hours = 0,
    minutes = 0;

  const dayMatch = input.match(/(\d+)\s*д/);
  if (dayMatch) {
    days = parseInt(dayMatch[1], 10);
  }

  const hourMatch = input.match(/(\d+)\s*ч/);
  if (hourMatch) {
    hours = parseInt(hourMatch[1], 10);
  }

  const minuteMatch = input.match(/(\d+)\s*м/);
  if (minuteMatch) {
    minutes = parseInt(minuteMatch[1], 10);
  }

  return [days, hours, minutes];
};

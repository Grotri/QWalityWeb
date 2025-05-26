export const formatUptime = (input: string): [number, number, number] => {
  let days = 0,
    hours = 0,
    minutes = 0;

  const dayMatch = input.match(/(\d+)\s*day/);
  if (dayMatch) {
    days = parseInt(dayMatch[1], 10);
  }

  const timeMatch = input.match(/(\d+):(\d+):(\d+)/);
  if (timeMatch) {
    hours = parseInt(timeMatch[1], 10);
    minutes = parseInt(timeMatch[2], 10);
  }

  return [days, hours, minutes];
};

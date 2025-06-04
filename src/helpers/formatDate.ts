export const formatDate = (date: Date) => {
  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const parseCustomDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.getTime();
};

export const formatISOToCustomDate = (
  isoDate: string,
  isMoscowTime?: boolean
): string => {
  const date = new Date(isoDate);
  const offsetMs = 3 * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() + (isMoscowTime ? offsetMs : 0));

  const hours = localDate.getHours().toString().padStart(2, "0");
  const minutes = localDate.getMinutes().toString().padStart(2, "0");
  const seconds = localDate.getSeconds().toString().padStart(2, "0");
  const day = localDate.getDate().toString().padStart(2, "0");
  const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
  const year = localDate.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}.${month}.${year}`;
};

export const convertISOToMoscow = (isoDate: string): string => {
  const date = new Date(isoDate);
  date.setHours(date.getHours() + 3);
  return date.toISOString();
};

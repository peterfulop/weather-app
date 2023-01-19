export const convertDateToString = (date: number): string => {
  const dateFormat = new Date(date * 1000);
  const formatter = new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  return formatter.format(dateFormat).concat('.');
};

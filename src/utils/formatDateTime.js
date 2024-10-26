export const formatMonth = (monthYear) => {
  const [month, year] = monthYear.split('-').map(Number);
  const date = new Date(year, month - 1);
  const formattedMonth = date.toLocaleString('en-US', { month: 'long' });
  return `${formattedMonth}, ${year}`;
};

export const formatDayMonth = (dateString) => {
  const [day, month, year] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const formattedDay = date.toLocaleString('en-US', { day: 'numeric' });
  const formattedMonth = date.toLocaleString('en-US', { month: 'long' });
  return `${formattedDay}, ${formattedMonth}`;
};

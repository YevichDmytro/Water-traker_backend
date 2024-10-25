const formatMonth = (monthYear) => {
  const [month, year] = monthYear.split('-').map(Number);
  const date = new Date(year, month - 1);
  const formattedMonth = date.toLocaleString('en-US', { month: 'long' });
  return `${formattedMonth}, ${year}`;
};

export default formatMonth;

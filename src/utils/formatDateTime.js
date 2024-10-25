const formatDateTime = (date) => {
  const year = date.getFullYear();
  const month = date.toLocaleString('en-US', { month: 'long' });
  return `${month}, ${year}`;
};

export default formatDateTime;

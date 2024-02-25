export const dateWithTimeFormat = (date: any) => {
  const dateObject = new Date(date);

  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const formattedDate = dateObject.toLocaleDateString('en-US', optionsDate);

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  const formattedTime = dateObject.toLocaleTimeString('en-US', optionsTime);

  const formattedDateTime = `${formattedTime},\n${formattedDate}`;
  return formattedDateTime;
};

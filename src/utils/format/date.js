import dayjs from 'dayjs';

export const isDatePastDueDateColor = (end_date) => {
  const endDate = new Date(end_date);
  const isDateInPast = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
  };
  const endDateIsPast = isDateInPast(endDate);
  return endDateIsPast ? 'red' : 'inherit';
};

export const formatDate = (dateString) => {
  const date = dayjs(dateString);
  if (date.isSame(dayjs(), 'day')) {
    return date.fromNow();
  } else {
    return date.format('MMM DD, YYYY');
  }
};

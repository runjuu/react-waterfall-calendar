import moment from 'moment';

const calendarLength = 42;

export const which = (diff) => {
  if (diff > 0) {
    return 'FUTURE';
  } else if (diff < 0) {
    return 'PAST';
  }

  return 'CURRENT';
};

export const slice = (month = [], count = 0) => {
  slice.month = [];

  for (let times = month.length / count; times > 0; times -= 1) {
    slice.month.push(
      month.slice((times - 1) * count, times * count),
    );
  }

  return slice.month.reverse();
};

export const formatDate = day => (moment(day).format('YYYY-MM-DD'));

export const fillUpEmptyDate = ({ date, type, count = 0 }) => {
  const dateArr = [];
  if (count < 0) return dateArr;

  switch (type) {
    case 'before':
      for (let day = count; day; day -= 1) {
        dateArr.push(
          formatDate(moment(date.subtract(1, 'days'))),
        );
      }
      dateArr.reverse();
      break;
    case 'after':
      for (let day = count; day; day -= 1) {
        dateArr.push(
          formatDate(moment(date.add(1, 'days'))),
        );
      }
      break;
    default:
      break;
  }

  return dateArr;
};

export const filterMonth = (month = moment(), firstWeekDay = 0) => {
  const days = [];
  const firstDateOfMonth = moment(month).date(1);

  for (let day = month.daysInMonth(); day; day -= 1) {
    days.unshift(formatDate(moment(month).date(day)));
  }

  days.splice(0, 0, ...fillUpEmptyDate({
    type: 'before',
    date: firstDateOfMonth,
    count: firstDateOfMonth.day(),
  }));

  days.splice(days.length, 0, ...fillUpEmptyDate({
    type: 'after',
    date: moment(days[days.length - 1]),
    count: calendarLength - days.length,
  }));

  return days;
};

export const filterInterval = (from, to, firstWeekDay) => {
  const interval = [];

  for (let month = moment(from); to.diff(month, 'month') >= 0; month.add(1, 'month')) {
    interval.push(
      slice(filterMonth(month, firstWeekDay), 7),
    );
  }

  return interval;
};

export const filterSelected = (dateString, selected = {}, selectType) => {
  const date = moment(dateString).format('YYYY-MM-DD');

  switch (selectType) {
    case 'value':
      
      break;
    default:
      return { [date]: true };
  }
};

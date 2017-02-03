import { getMonthData, getDateArray, splitArray, newDate, filterEvents, monthDiff } from '../methods';

export const getCalendarArray = (dateArray, fwd = 0) => {
  let calendarArray = [];
  let firstWeekDay = fwd;
  const lastMonthArray = [];
  const nextMonthArray = [];
  const dateReg = /(\w{4})-(\w{1,2})-(\w{1,2})/g;

  if (firstWeekDay > 6) firstWeekDay = 6;
  if (firstWeekDay < 0) firstWeekDay = 0;

  const dayOfFirstDayOfMonth = (
    dateArray[0].weekDay >= firstWeekDay
    ) ? (
      dateArray[0].weekDay - firstWeekDay
      ) : (
        (7 - firstWeekDay) + dateArray[0].weekDay
        );
  const lastWeekDay = firstWeekDay - 1 < 0 ? 6 : firstWeekDay - 1;
  const dateOfFirstDayOfMonth = dateArray[0].date;
  const dateOfLastDayOfMonth = dateArray[dateArray.length - 1].date;
  const regFirstDay = dateReg.exec(dateOfFirstDayOfMonth); dateReg.lastIndex = 0;
  const regLastDay = dateReg.exec(dateOfLastDayOfMonth);

  for (let last = 1; last <= dayOfFirstDayOfMonth; last += 1) {
    const date = new Date(
      regFirstDay[1],
      Number(regFirstDay[2]) - 1,
      Number(regFirstDay[3]) - last);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    lastMonthArray.push({
      date: `${year}-${month + 1}-${day}`,
      weekDay: date.getDay(),
    });
  }
  calendarArray = lastMonthArray.reverse().concat(dateArray);

  if (calendarArray[calendarArray.length - 1].weekDay !== lastWeekDay) {
    let shouldKeepAdd = !nextMonthArray[0];
    for (let next = 1; shouldKeepAdd; next += 1) {
      const date = new Date(
        regLastDay[1],
        Number(regLastDay[2]) - 1,
        Number(regLastDay[3]) + next);

      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      nextMonthArray.push({
        date: `${year}-${month + 1}-${day}`,
        weekDay: date.getDay(),
      });
      shouldKeepAdd = nextMonthArray[nextMonthArray.length - 1].weekDay !== lastWeekDay;
    }
    calendarArray = calendarArray.concat(nextMonthArray);
  }

  return splitArray({
    each: 7,
    array: calendarArray,
  });
};

export const initCalendar = ({ date: d = new Date(), firstWeekDay }) => {
  const date = newDate(d);
  const year = date.getFullYear();
  const month = date.getMonth();
  const { daysInMonth, dayOfFirstDayOfMonth } = getMonthData({ year, month });
  const dateArray = getDateArray({ daysInMonth, month, year });
  const calendarArray = getCalendarArray(dateArray, firstWeekDay);
  return {
    year,
    month,
    daysInMonth,
    dayOfFirstDayOfMonth,
    dateArray,
    calendarArray,
    firstWeekDay,
  };
};

export const setDateEvents = events => (
  filterEvents(events)
);

export const setSelected = ({ date, state, multipleSelect }) => {
  const selected = {};
  selected[date] = !state[date];
  if (multipleSelect) {
    return Object.assign({}, this.state.selected, selected);
  }
  return selected;
};

export const shouldUpdateSelected = ({ current, next, date }) => {
  const diff = Object.keys(Object.assign({}, current, next)).filter((item) => {
    if (current[item] !== next[item] && monthDiff(date, newDate(item)) === 0) {
      return true;
    }
    return false;
  });
  return !!diff[0];
};

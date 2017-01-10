import { getMonthData, getDateArray, splitArray } from '../methods';

export const getCalendarArray = (dateArray) => {
  let calendarArray = [];
  const lastMonthArray = [];
  const nextMonthArray = [];
  const dateReg = /(\w{4})-(\w{1,2})-(\w{1,2})/g;
  const dayOfFirstDayOfMonth = dateArray[0].weekDay;
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

  if (calendarArray[calendarArray.length - 1].weekDay !== 6) {
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
      shouldKeepAdd = nextMonthArray[nextMonthArray.length - 1].weekDay !== 6;
    }
    calendarArray = calendarArray.concat(nextMonthArray);
  }

  return splitArray({
    each: 7,
    array: calendarArray,
  });
};

export const initCalendar = (d) => {
  const date = d instanceof Date ? d : new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth();
  const { daysInMonth, dayOfFirstDayOfMonth } = getMonthData({ year, month });
  const dateArray = getDateArray({ daysInMonth, month, year });
  const calendarArray = getCalendarArray(dateArray);
  return {
    year,
    month,
    daysInMonth,
    dayOfFirstDayOfMonth,
    dateArray,
    calendarArray,
  };
};

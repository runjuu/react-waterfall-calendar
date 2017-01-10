export const getMonthData = ({ year, month }) => ({
  daysInMonth: new Date(year, month + 1, 0).getDate(),
  dayOfFirstDayOfMonth: new Date(year, month, 1).getDay(),
});

export const getDateArray = ({ daysInMonth, month, year }) => {
  const dateArray = [];
  for (let day = 1; day <= daysInMonth; day += 1) {
    dateArray.push({
      date: `${year}-${month + 1}-${day}`,
      weekDay: new Date(year, month, day).getDay(),
    });
  }
  return dateArray;
};

export const splitArray = ({ each = 0, array = [] }) => {
  if (!Number(each)) return [];

  let verticalArray = [];
  const horizontalArray = [];

  array.forEach(((item, i) => {
    const index = i + 1;

    verticalArray.push(item);
    if (index % each === 0) {
      horizontalArray.push(verticalArray);
      verticalArray = [];
    }
  }));

  return horizontalArray;
};

export const filterDate = (dateString) => {
  const date = new Date(dateString);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    date,
  };
};

export const whichMonth = ({ date, refer }) => {
  let which;
  const LAST_MONTH = 'LAST_MONTH';
  const NEXT_MONTH = 'NEXT_MONTH';
  const CURRENT_MONTH = 'CURRENT_MONTH';
  const dateFilter = filterDate(date);
  const referFilter = filterDate(refer);

  if (dateFilter.year === referFilter.year) {
    if (dateFilter.month < referFilter.month) {
      which = LAST_MONTH;
    } else if (dateFilter.month > referFilter.month) {
      which = NEXT_MONTH;
    } else {
      which = CURRENT_MONTH;
    }
  } else if (dateFilter.year < referFilter.year) {
    which = LAST_MONTH;
  } else if (dateFilter.year > referFilter.year) {
    which = NEXT_MONTH;
  }

  return which;
};

export const isToday = (d) => {
  const today = new Date();
  const date = d instanceof Date ? d : new Date(d);
  if (date) {
    return date.toDateString() === today.toDateString();
  }
  return false;
};

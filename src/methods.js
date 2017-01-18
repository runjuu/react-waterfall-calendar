export const newDate = (d) => {
  let date;
  if (d instanceof Date) {
    date = d;
  } else {
    const dateReg = /(\w{4})-(\w{1,2})-(\w{1,2})|(\w{4})-(\w{1,2})/g;
    const regDate = d instanceof Date || dateReg.exec(d); if (!regDate) return false;
    const year = regDate[1] || regDate[4];
    const month = regDate[2] || regDate[5];
    const day = regDate[3] || 1;
    date = new Date(year, month - 1, day);
  }

  return date;
};

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

export const filterDate = (d) => {
  const date = newDate(d);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    date,
  };
};

export const filterEvents = (eventsArray = []) => {
  const events = {};
  eventsArray.forEach(((event) => {
    const { year, month, day } = filterDate(event.date);
    const date = `${year}-${month + 1}-${day}`;
    events[date] = event;
  }));

  return events;
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

export const whichDay = (d) => {
  const today = (new Date()).setHours(0,0,0,0);
  const date = newDate(d).setHours(0,0,0,0);
  if (date < today) {
    return 'PAST';
  } else if (date > today) {
    return 'FUTURE';
  }
  return 'TODAY';
};

export const isToday = (d) => {
  const today = new Date();
  const date = newDate(d);
  if (date) {
    return date.toDateString() === today.toDateString();
  }
  return false;
};

export const monthDiff = (d1, d2) => {
  if (d1 instanceof Date && d1 instanceof Date) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;
    return months <= 0 ? 0 : months;
  }
  throw new Error('need Date type');
};

export const filterDataAttr = (attrObj) => {
  const attr = {};
  const attrArray = Object.keys(attrObj);
  attrArray.forEach((item) => {
    attr[`data-${item}`] = attrObj[item];
  });

  return attr;
};

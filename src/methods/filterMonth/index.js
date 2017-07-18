import moment from 'moment';
import formatDate from '../formatDate/';
import fillUpEmptyDate from '../fillUpEmptyDate/';
import { calendarLength } from '../';

const filterMonth = (passInMonth) => {
  // TODO 根据传入的 firstWeekDay 渲染日历
  let month = moment.isMoment(passInMonth) ? passInMonth : moment(passInMonth);
  const days = [];
  const firstDateOfMonth = moment(month).date(1);

  if (!month.isValid()) month = moment();

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

export default filterMonth;

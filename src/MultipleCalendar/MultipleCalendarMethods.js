import { monthDiff, filterDate, monthIncrease } from '../methods';
import { initCalendar } from '../Calendar/CalendarMethods';

export const setMultipleCalendar = ({ from = new Date(), to = monthIncrease(from, 12) }) => {
  const listOfCalendar = [];
  const { year, month } = filterDate(from);
  const numberOfMonths = monthDiff(from, to);

  for (let index = 0; index < numberOfMonths + 1; index += 1) {
    const date = new Date(year, month + index);
    const dateFilter = filterDate(date);
    listOfCalendar.push({
      monthWithYear: `${dateFilter.year}-${dateFilter.month}`,
      calendar: initCalendar(date),
    });
  }

  return {
    from,
    to,
    listOfCalendar,
  };
};

import moment from 'moment';
import slice from '../slice/';
import filterMonth from '../filterMonth/';

const calculateMonthInterval = (from, to, firstWeekDay) => {
  const interval = [];

  for (let month = moment(from); to.diff(month, 'month') >= 0; month.add(1, 'month')) {
    interval.push(
      slice(filterMonth(month, firstWeekDay), 7),
    );
  }

  return interval;
};

export default calculateMonthInterval;

import moment from 'moment';
import slice from '../slice/';
import filterMonth from '../filterMonth/';

const calculateMonthInterval = (from, to) => {
  const interval = [];

  for (let month = moment(from); moment(to).diff(month, 'month') >= 0; month.add(1, 'month')) {
    interval.push(
      slice(filterMonth(month), 7),
    );
  }

  return interval;
};

export default calculateMonthInterval;

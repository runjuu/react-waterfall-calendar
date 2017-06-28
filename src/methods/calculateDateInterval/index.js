import moment from 'moment';
import formatDate from '../formatDate/';

const calculateDateInterval = (from, to) => {
  const interval = [];

  for (let days = to.diff(from, 'days'); days >= 0; days -= 1) {
    interval.unshift(
      formatDate(moment(from).add(days, 'days')),
    );
  }

  return interval;
};

export default calculateDateInterval;

import moment from 'moment';
import formatDate from '../formatDate/';

const calculateDateInterval = (fromDate, toDate) => {
  const interval = [];
  const from = moment.isMoment(fromDate) ? fromDate : moment(new Date(fromDate));
  const to = moment.isMoment(toDate) ? toDate : moment(new Date(toDate));

  for (let days = to.diff(from, 'days'); days >= 0; days -= 1) {
    interval.unshift(
      formatDate(moment(from).add(days, 'days')),
    );
  }

  return interval;
};

export default calculateDateInterval;

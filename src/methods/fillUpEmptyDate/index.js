import moment from 'moment';
import formatDate from '../formatDate/';

const fillUpEmptyDate = ({ date: defaultDate, type = 'after', count = 0 }) => {
  const dateArr = [];
  const date = moment.isMoment(defaultDate) ? defaultDate : moment(new Date(defaultDate));
  if (count < 0) return dateArr;

  switch (type) {
    case 'before':
      for (let day = count; day; day -= 1) {
        dateArr.push(
          formatDate(moment(date.subtract(1, 'days'))),
        );
      }
      dateArr.reverse();
      break;
    case 'after':
      for (let day = count; day; day -= 1) {
        dateArr.push(
          formatDate(moment(date.add(1, 'days'))),
        );
      }
      break;
    default:
      break;
  }

  return dateArr;
};

export default fillUpEmptyDate;

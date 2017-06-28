import moment from 'moment';
import calculateDateInterval from '../calculateDateInterval/';

const filterSelected = (dateString, selected = {}, selectType) => {
  const date = moment(dateString);

  if (selectType === 'INTERVAL') {
    const selectedDates = Object.keys(selected);
    if (selectedDates.length <= 1) {
      const result = {};
      let minDate = date;

      selectedDates.forEach((d) => {
        if (moment(minDate).diff(d, 'days') > 0) minDate = moment(d);
      });

      if (date.diff(minDate, 'days') < 0) return { [dateString]: true };

      calculateDateInterval(minDate, date).forEach((d) => {
        result[d] = true;
      });

      return result;
    }
    return { [dateString]: true };
  } else if (selectType === 'MULTIPLE') {
    return Object.assign({}, selected, { [dateString]: true });
  } else if (selectType === 'SINGLE') {
    return { [dateString]: true };
  }

  return selected;
};

export default filterSelected;

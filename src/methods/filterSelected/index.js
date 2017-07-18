import moment from 'moment';
import calculateDateInterval from '../calculateDateInterval/';

const filterSelected = (dateString, selected = {}, selectType) => {
  if (!(/\d{4}-\d{2}-\d{2}/.test(dateString))) return selected;

  const date = moment(dateString);

  if (!date.isValid() || date.format('YYYY-MM-DD') !== dateString) return selected;

  if (selectType === 'INTERVAL') {
    const selectedDates = Object.keys(selected).filter(key => selected[key]);
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
    return Object.assign({}, selected, { [dateString]: !selected[dateString] });
  } else if (selectType === 'SINGLE') {
    return { [dateString]: !selected[dateString] };
  }

  return selected;
};

export default filterSelected;

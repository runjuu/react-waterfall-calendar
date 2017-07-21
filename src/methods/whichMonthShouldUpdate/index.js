import moment from 'moment';

const whichMonthShouldUpdate = (selected = {}) => {
  const updateMonth = {};
  const result = { ...(whichMonthShouldUpdate.month || {}) };

  Object.keys(selected).forEach((date) => {
    updateMonth[moment(date).format('YYYY-MM')] = true;
  });

  whichMonthShouldUpdate.month = updateMonth;
  return Object.assign({}, result, updateMonth);
};

export default whichMonthShouldUpdate;

import moment from 'moment';

const whichMonthShouldUpdate = (selected = {}) => {
  whichMonthShouldUpdate.month = whichMonthShouldUpdate.month || {};

  const updateMonth = {};
  Object.keys(selected).forEach((date) => {
    updateMonth[moment(date).format('YYYY-MM')] = true;
  });
  Object.assign(updateMonth, whichMonthShouldUpdate.month);

  whichMonthShouldUpdate.month = updateMonth;
  return updateMonth;
};

export default whichMonthShouldUpdate;

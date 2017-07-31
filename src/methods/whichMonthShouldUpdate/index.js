import moment from 'moment';

const initWhichMonthShouldUpdate = () => (
  function whichMonthShouldUpdate(selected = {}) {
    const updateMonth = {};
    const result = { ...(whichMonthShouldUpdate.month || {}) };

    Object.keys(selected).forEach((date) => {
      updateMonth[moment(new Date(date)).format('YYYY-MM')] = true;
    });

    whichMonthShouldUpdate.month = updateMonth;
    return Object.assign({}, result, updateMonth);
  }
);

export default initWhichMonthShouldUpdate;

import moment from 'moment';

const dateReg = /\d{4}-\d{2}-\d{2}/;
const filterArrayOfSelected = (arrayOfSelected) => {
  const selected = {};
  if (arrayOfSelected instanceof Array) {
    arrayOfSelected
      .filter(dateString => typeof dateString === 'string')
      .forEach((dateString) => {
        const date = moment(new Date(dateString)).format('YYYY-MM-DD');
        if (dateReg.test(date)) selected[date] = true;
      });
  }
  return selected;
};

export default filterArrayOfSelected;

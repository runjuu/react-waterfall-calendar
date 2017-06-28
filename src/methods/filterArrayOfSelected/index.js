import moment from 'moment';

const filterArrayOfSelected = (arrayOfSelected) => {
  const selected = {};
  if (arrayOfSelected instanceof Array) {
    arrayOfSelected.forEach((dateString) => {
      if (dateString) selected[moment(dateString).format('YYYY-MM-DD')] = true;
    });
  }
  return selected;
};

export default filterArrayOfSelected;

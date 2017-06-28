import moment from 'moment';

const filterDataAttribute = (dataAttribute = {}) => {
  const result = {};

  Object.keys(dataAttribute).forEach((dateString) => {
    if (!dateString) return;
    const date = moment(dateString).format('YYYY-MM-DD');
    result[date] = result[date] || {};
    Object.keys(dataAttribute[date]).forEach((attribute) => {
      result[date][`data-${attribute}`] = dataAttribute[date][attribute];
    });
  });

  return result;
};

export default filterDataAttribute;

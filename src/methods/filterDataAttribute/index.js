import moment from 'moment';

const filterDataAttribute = (dataAttribute = {}) => {
  const result = {};

  Object.keys(dataAttribute).forEach((dateString) => {
    if (!dateString) return;
    let key = moment(new Date(dateString)).format('YYYY-MM-DD');

    if (key === 'Invalid date') key = dateString;
    result[key] = result[key] || {};
    Object.keys(dataAttribute[dateString]).forEach((attribute) => {
      result[key][`data-${attribute}`] = dataAttribute[dateString][attribute];
    });
  });

  return result;
};

export default filterDataAttribute;

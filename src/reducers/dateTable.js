import moment from 'moment';

function filter(date) {
  return false;
}

export default function dateTable(
  state = [],
  action) {
  const date = state.date || moment().format('YYYY-MM-DD');
  const table = filter(date);
  return state;
}

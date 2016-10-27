import moment from 'moment';

export default function dateMethod(
  state = moment().format('YYYY-MM-DD'),
  action) {
  let date = state;
  switch (action.type) {
    case 'GO_NEXT_MONTH':
      date = moment(state).add(1, 'M').format('YYYY-MM-DD');
      break;
    case 'GO_LAST_MONTH':
      date = moment(state).subtract(1, 'M').format('YYYY-MM-DD');
      break;
    default:
      return state;
  }
  return date;
}

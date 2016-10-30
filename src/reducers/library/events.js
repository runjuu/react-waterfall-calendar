import moment from 'moment';

export default function events(
  state = {
    isSelected: {},
    customize: {},
    clickDate: '',
    totalTimes: 0,
  },
  action) {
  const isSelected = state.isSelected;
  switch (action.type) {
    case 'ON_CLICK_DATE':
      isSelected[action.date] = !isSelected[action.date];
      if (typeof action.callback === 'function') {
        action.callback({
          date: action.date,
        });
      }
      return {
        isSelected,
        customize: action.customize || {},
        clickDate: action.date,
        totalTimes: state.totalTimes + 1,
      };
    default:
      return state;
  }
}

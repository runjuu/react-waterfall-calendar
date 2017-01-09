import {
  INIT_CALENDAR,
} from './CalendarActions';

export const calendar = (state = {}, action) => {
  switch (action.type) {
    case INIT_CALENDAR:
      return {
        test: '124',
      };
    default:
      return state;
  }
};

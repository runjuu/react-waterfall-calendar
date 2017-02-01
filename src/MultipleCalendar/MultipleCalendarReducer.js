import { setMultipleCalendar } from './MultipleCalendarMethods';
import {
  SET_MULTIPLECALENDAR,
  ADD_MULTIPLECALENDAR,
  RESET_MULTIPLECALENDAR,
} from './MultipleCalendarActions';

import { monthIncrease } from '../methods';

const multipleCalendar = (state = {}, action) => {
  const { from = state.from, to = state.to } = action;
  switch (action.type) {
    case SET_MULTIPLECALENDAR:
      return {
        ...setMultipleCalendar({ from, to }),
      };
    case ADD_MULTIPLECALENDAR:
      return {
        ...setMultipleCalendar({ from, to: monthIncrease(to, 12) }),
      };
    case RESET_MULTIPLECALENDAR:
      return {
        ...setMultipleCalendar({}),
      };
    default:
      return state;
  }
};

export default multipleCalendar;

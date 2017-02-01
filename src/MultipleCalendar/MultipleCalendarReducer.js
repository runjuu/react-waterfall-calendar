import { setMultipleCalendar } from './MultipleCalendarMethods';
import {
  SET_MULTIPLECALENDAR,
} from './MultipleCalendarActions';

const multipleCalendar = (state = {}, action) => {
  const { from, to } = action;
  switch (action.type) {
    case SET_MULTIPLECALENDAR:
      return {
        ...setMultipleCalendar({ from, to }),
      };
    default:
      return state;
  }
};

export default multipleCalendar;

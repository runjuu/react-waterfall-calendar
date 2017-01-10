import { initMultipleCalendar } from './MultipleCalendarMethods';
import {
  INIT_MULTIPLECALENDAR,
} from './MultipleCalendarActions';

const multipleCalendar = (state = {}, action) => {
  const { from, to } = action;
  switch (action.type) {
    case INIT_MULTIPLECALENDAR:
      return {
        ...initMultipleCalendar({ from, to }),
      };
    default:
      return state;
  }
};

export default multipleCalendar;

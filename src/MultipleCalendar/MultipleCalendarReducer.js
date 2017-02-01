import { setMultipleCalendar } from './MultipleCalendarMethods';
import {
  INIT_MULTIPLECALENDAR,
} from './MultipleCalendarActions';

const multipleCalendar = (state = {}, action) => {
  const { from, to } = action;
  switch (action.type) {
    case INIT_MULTIPLECALENDAR:
      return {
        ...setMultipleCalendar({ from, to }),
      };
    default:
      return state;
  }
};

export default multipleCalendar;

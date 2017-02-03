import { setSelected, setDateEvents } from './CalendarMethods';
import {
  INIT_DATE_EVENTS,
  SET_SELECTED,
} from './CalendarActions';

const selected = (state = {}, action) => {
  const { date, multipleSelect } = action;
  switch (action.type) {
    case SET_SELECTED:
      return setSelected({
        date,
        state,
        multipleSelect,
      });
    default:
      return state;
  }
};

const dateEvents = (state = {}, action) => {
  const { events } = action;
  switch (action.type) {
    case INIT_DATE_EVENTS:
      return setDateEvents(events);
    default:
      return state;
  }
};

export default {
  selected,
  dateEvents,
};

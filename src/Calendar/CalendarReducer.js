import { initCalendar, setSelected, setDateEvents } from './CalendarMethods';
import {
  INIT_CALENDAR,
  INIT_DATE_EVENTS,
  SET_SELECTED,
} from './CalendarActions';

const calendar = (state = {}, action) => {
  switch (action.type) {
    case INIT_CALENDAR:
      return initCalendar();
    default:
      return state;
  }
};

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
  calendar,
  selected,
  dateEvents,
};

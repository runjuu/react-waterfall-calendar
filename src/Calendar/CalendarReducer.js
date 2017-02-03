import { setSelected, setDataAttr } from './CalendarMethods';
import {
  INIT_DATE_EVENTS,
  SET_SELECTED,
} from './CalendarActions';

const selected = (state = {}, action) => {
  const { date, multipleSelect = !!state.multipleSelect } = action;
  switch (action.type) {
    case SET_SELECTED:
      return setSelected({
        date,
        state,
        multipleSelect: !!multipleSelect,
      });
    default:
      return state;
  }
};

const dataAttr = (state = {}, action) => {
  const { events } = action;
  switch (action.type) {
    case INIT_DATE_EVENTS:
      return setDataAttr(events);
    default:
      return state;
  }
};

export default {
  selected,
  dataAttr,
};

import { combineReducers } from 'redux';
import CalendarReducer from './Calendar/CalendarReducer';
import multipleCalendar from './MultipleCalendar/MultipleCalendarReducer';

const { selected, dateEvents } = CalendarReducer;

const rootReducer = combineReducers({
  selected,
  dateEvents,
  multipleCalendar,
});

export default rootReducer;

import { combineReducers } from 'redux';
import CalendarReducer from './Calendar/CalendarReducer';
import multipleCalendar from './MultipleCalendar/MultipleCalendarReducer';

const { calendar, selected, dateEvents } = CalendarReducer;

const rootReducer = combineReducers({
  calendar,
  selected,
  dateEvents,
  multipleCalendar,
});

export default rootReducer;

import { combineReducers } from 'redux';
import CalendarReducer from './Calendar/CalendarReducer';
import multipleCalendar from './MultipleCalendar/MultipleCalendarReducer';

const { calendar, selected } = CalendarReducer;

const rootReducer = combineReducers({
  calendar,
  selected,
  multipleCalendar,
});

export default rootReducer;

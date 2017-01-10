import { combineReducers } from 'redux';
import calendar from './Calendar/CalendarReducer';
import multipleCalendar from './MultipleCalendar/MultipleCalendarReducer';

const rootReducer = combineReducers({
  calendar,
  multipleCalendar,
});

export default rootReducer;

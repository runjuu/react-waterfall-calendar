import { combineReducers } from 'redux';
import CalendarReducer from './Calendar/CalendarReducer';
import multipleCalendar from './MultipleCalendar/MultipleCalendarReducer';

const { selected, dataAttr } = CalendarReducer;

const rootReducer = combineReducers({
  selected,
  dataAttr,
  multipleCalendar,
});

export default rootReducer;

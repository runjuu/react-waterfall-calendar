import { combineReducers } from 'redux';
import { calendar } from './Calendar/CalendarReducer';

const rootReducer = combineReducers({
  calendar,
});

export default rootReducer;

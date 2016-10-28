import { combineReducers } from 'redux';
import date from './library/date';
import events from './library/events';
import titleFormat from './library/titleFormat';
import dateTable from './library/dateTable';
import selectType from './library/selectType';

const reducers = combineReducers({
  date,
  events,
  dateTable,
  selectType,
  titleFormat,
});

export default reducers;

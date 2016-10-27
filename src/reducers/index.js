import { combineReducers } from 'redux';
import date from './date';
import titleFormat from './titleFormat';
import dateTable from './dateTable';

const reducers = combineReducers({
  date,
  dateTable,
  titleFormat,
});

export default reducers;

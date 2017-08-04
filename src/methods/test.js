import slice from './slice/test';
import formatDate from './formatDate/test';
import filterSelected from './filterSelected/test';
import filterMonth from './filterMonth/test';
import filterDataAttribute from './filterDataAttribute/test';
import filterArrayOfSelected from './filterArrayOfSelected/test';
import fillUpEmptyDate from './fillUpEmptyDate/test';
import calculateMonthInterval from './calculateMonthInterval/test';
import calculateDateInterval from './calculateDateInterval/test';
import which from './which/test';
import whichMonthShouldUpdate from './whichMonthShouldUpdate/test';
import FuncPool from './FuncPool/test';
import newError from './newError/test';

describe('methods', () => {
  slice();
  formatDate();
  filterSelected();
  filterMonth();
  filterDataAttribute();
  filterArrayOfSelected();
  fillUpEmptyDate();
  calculateMonthInterval();
  calculateDateInterval();
  which();
  whichMonthShouldUpdate();
  FuncPool();
  newError();
});

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldUpdateSelected = exports.setSelected = exports.setDateEvents = exports.initCalendar = exports.getCalendarArray = undefined;

var _methods = require('../methods');

var getCalendarArray = exports.getCalendarArray = function getCalendarArray(dateArray) {
  var calendarArray = [];
  var lastMonthArray = [];
  var nextMonthArray = [];
  var dateReg = /(\w{4})-(\w{1,2})-(\w{1,2})/g;
  var dayOfFirstDayOfMonth = dateArray[0].weekDay;
  var dateOfFirstDayOfMonth = dateArray[0].date;
  var dateOfLastDayOfMonth = dateArray[dateArray.length - 1].date;
  var regFirstDay = dateReg.exec(dateOfFirstDayOfMonth);dateReg.lastIndex = 0;
  var regLastDay = dateReg.exec(dateOfLastDayOfMonth);

  for (var last = 1; last <= dayOfFirstDayOfMonth; last += 1) {
    var date = new Date(regFirstDay[1], Number(regFirstDay[2]) - 1, Number(regFirstDay[3]) - last);

    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    lastMonthArray.push({
      date: year + '-' + (month + 1) + '-' + day,
      weekDay: date.getDay()
    });
  }
  calendarArray = lastMonthArray.reverse().concat(dateArray);

  if (calendarArray[calendarArray.length - 1].weekDay !== 6) {
    var shouldKeepAdd = !nextMonthArray[0];
    for (var next = 1; shouldKeepAdd; next += 1) {
      var _date = new Date(regLastDay[1], Number(regLastDay[2]) - 1, Number(regLastDay[3]) + next);

      var _year = _date.getFullYear();
      var _month = _date.getMonth();
      var _day = _date.getDate();
      nextMonthArray.push({
        date: _year + '-' + (_month + 1) + '-' + _day,
        weekDay: _date.getDay()
      });
      shouldKeepAdd = nextMonthArray[nextMonthArray.length - 1].weekDay !== 6;
    }
    calendarArray = calendarArray.concat(nextMonthArray);
  }

  return (0, _methods.splitArray)({
    each: 7,
    array: calendarArray
  });
};

var initCalendar = exports.initCalendar = function initCalendar() {
  var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();

  var date = (0, _methods.newDate)(d);
  var year = date.getFullYear();
  var month = date.getMonth();

  var _getMonthData = (0, _methods.getMonthData)({ year: year, month: month }),
      daysInMonth = _getMonthData.daysInMonth,
      dayOfFirstDayOfMonth = _getMonthData.dayOfFirstDayOfMonth;

  var dateArray = (0, _methods.getDateArray)({ daysInMonth: daysInMonth, month: month, year: year });
  var calendarArray = getCalendarArray(dateArray);
  return {
    year: year,
    month: month,
    daysInMonth: daysInMonth,
    dayOfFirstDayOfMonth: dayOfFirstDayOfMonth,
    dateArray: dateArray,
    calendarArray: calendarArray
  };
};

var setDateEvents = exports.setDateEvents = function setDateEvents(events) {
  return (0, _methods.filterEvents)(events);
};

var setSelected = exports.setSelected = function setSelected(_ref) {
  var date = _ref.date,
      state = _ref.state,
      multipleSelect = _ref.multipleSelect;

  var selected = {};
  selected[date] = !state[date];
  if (multipleSelect) {
    return Object.assign({}, undefined.state.selected, selected);
  }
  return selected;
};

var shouldUpdateSelected = exports.shouldUpdateSelected = function shouldUpdateSelected(_ref2) {
  var current = _ref2.current,
      next = _ref2.next,
      date = _ref2.date;

  var diff = Object.keys(Object.assign({}, current, next)).filter(function (item) {
    if (current[item] !== next[item] && (0, _methods.monthDiff)(date, (0, _methods.newDate)(item)) === 0) {
      return true;
    }
    return false;
  });
  return !!diff[0];
};
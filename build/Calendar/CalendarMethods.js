'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldUpdateDataAttr = exports.shouldUpdateSelected = exports.setSelected = exports.setDataAttr = exports.initCalendar = exports.getCalendarArray = undefined;

var _methods = require('../methods');

var getCalendarArray = exports.getCalendarArray = function getCalendarArray(dateArray) {
  var fwd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var calendarArray = [];
  var firstWeekDay = fwd;
  var lastMonthArray = [];
  var nextMonthArray = [];
  var dateReg = /(\w{4})-(\w{1,2})-(\w{1,2})/g;

  if (firstWeekDay > 6) firstWeekDay = 6;
  if (firstWeekDay < 0) firstWeekDay = 0;

  var dayOfFirstDayOfMonth = dateArray[0].weekDay >= firstWeekDay ? dateArray[0].weekDay - firstWeekDay : 7 - firstWeekDay + dateArray[0].weekDay;
  var lastWeekDay = firstWeekDay - 1 < 0 ? 6 : firstWeekDay - 1;
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

  if (calendarArray[calendarArray.length - 1].weekDay !== lastWeekDay) {
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
      shouldKeepAdd = nextMonthArray[nextMonthArray.length - 1].weekDay !== lastWeekDay;
    }
    calendarArray = calendarArray.concat(nextMonthArray);
  }

  return (0, _methods.splitArray)({
    each: 7,
    array: calendarArray
  });
};

var initCalendar = exports.initCalendar = function initCalendar(_ref) {
  var _ref$date = _ref.date,
      d = _ref$date === undefined ? new Date() : _ref$date,
      firstWeekDay = _ref.firstWeekDay;

  var date = (0, _methods.newDate)(d);
  var year = date.getFullYear();
  var month = date.getMonth();

  var _getMonthData = (0, _methods.getMonthData)({ year: year, month: month }),
      daysInMonth = _getMonthData.daysInMonth,
      dayOfFirstDayOfMonth = _getMonthData.dayOfFirstDayOfMonth;

  var dateArray = (0, _methods.getDateArray)({ daysInMonth: daysInMonth, month: month, year: year });
  var calendarArray = getCalendarArray(dateArray, firstWeekDay);
  return {
    year: year,
    month: month,
    daysInMonth: daysInMonth,
    dayOfFirstDayOfMonth: dayOfFirstDayOfMonth,
    dateArray: dateArray,
    calendarArray: calendarArray,
    firstWeekDay: firstWeekDay
  };
};

var setDataAttr = exports.setDataAttr = function setDataAttr() {
  var events = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var dateEvents = {};
  Object.keys(events).forEach(function (event) {
    var _filterDate = (0, _methods.filterDate)(event),
        year = _filterDate.year,
        month = _filterDate.month,
        day = _filterDate.day;

    var date = year + '-' + (month + 1) + '-' + day;
    var attr = events[event];
    dateEvents[date] = attr ? (0, _methods.filterDataAttr)(attr) : {};
  });
  return dateEvents;
};

var setSelected = exports.setSelected = function setSelected(_ref2) {
  var date = _ref2.date,
      state = _ref2.state,
      multipleSelect = _ref2.multipleSelect;

  var selected = { multipleSelect: multipleSelect };
  selected[date] = !state[date];
  if (multipleSelect) {
    return Object.assign({}, state, selected);
  }
  return selected;
};

var shouldUpdateSelected = exports.shouldUpdateSelected = function shouldUpdateSelected(_ref3) {
  var current = _ref3.current,
      next = _ref3.next,
      date = _ref3.date;

  var diff = Object.keys(Object.assign({}, current, next)).filter(function (item) {
    if (current[item] !== next[item] && (0, _methods.monthDiff)(date, (0, _methods.newDate)(item)) === 0) {
      return true;
    }
    return false;
  });
  return !!diff[0];
};

var shouldUpdateDataAttr = exports.shouldUpdateDataAttr = function shouldUpdateDataAttr(_ref4) {
  var current = _ref4.current,
      next = _ref4.next;

  var diff = Object.keys(Object.assign({}, current, next)).filter(function (item) {
    if (current[item] !== next[item]) {
      return true;
    }
    return false;
  });
  return !!diff[0];
};
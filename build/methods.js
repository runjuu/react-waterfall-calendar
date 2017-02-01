'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var newDate = exports.newDate = function newDate(d) {
  var date = void 0;
  if (d instanceof Date) {
    date = d;
  } else {
    var dateReg = /(\w{4})-(\w{1,2})-(\w{1,2})|(\w{4})-(\w{1,2})/g;
    var regDate = d instanceof Date || dateReg.exec(d);if (!regDate) return false;
    var year = regDate[1] || regDate[4];
    var month = regDate[2] || regDate[5];
    var day = regDate[3] || 1;
    date = new Date(year, month - 1, day);
  }

  return date;
};

var getMonthData = exports.getMonthData = function getMonthData(_ref) {
  var year = _ref.year,
      month = _ref.month;
  return {
    daysInMonth: new Date(year, month + 1, 0).getDate(),
    dayOfFirstDayOfMonth: new Date(year, month, 1).getDay()
  };
};

var getDateArray = exports.getDateArray = function getDateArray(_ref2) {
  var daysInMonth = _ref2.daysInMonth,
      month = _ref2.month,
      year = _ref2.year;

  var dateArray = [];
  for (var day = 1; day <= daysInMonth; day += 1) {
    dateArray.push({
      date: year + '-' + (month + 1) + '-' + day,
      weekDay: new Date(year, month, day).getDay()
    });
  }
  return dateArray;
};

var splitArray = exports.splitArray = function splitArray(_ref3) {
  var _ref3$each = _ref3.each,
      each = _ref3$each === undefined ? 0 : _ref3$each,
      _ref3$array = _ref3.array,
      array = _ref3$array === undefined ? [] : _ref3$array;

  if (!Number(each)) return [];

  var verticalArray = [];
  var horizontalArray = [];

  array.forEach(function (item, i) {
    var index = i + 1;

    verticalArray.push(item);
    if (index % each === 0) {
      horizontalArray.push(verticalArray);
      verticalArray = [];
    }
  });

  return horizontalArray;
};

var filterDate = exports.filterDate = function filterDate(d) {
  var date = newDate(d);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
    date: date
  };
};

var filterEvents = exports.filterEvents = function filterEvents() {
  var eventsArray = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var events = {};
  eventsArray.forEach(function (event) {
    var _filterDate = filterDate(event.date),
        year = _filterDate.year,
        month = _filterDate.month,
        day = _filterDate.day;

    var date = year + '-' + (month + 1) + '-' + day;
    events[date] = event;
  });

  return events;
};

var whichMonth = exports.whichMonth = function whichMonth(_ref4) {
  var date = _ref4.date,
      refer = _ref4.refer;

  var which = void 0;
  var LAST_MONTH = 'LAST_MONTH';
  var NEXT_MONTH = 'NEXT_MONTH';
  var CURRENT_MONTH = 'CURRENT_MONTH';
  var dateFilter = filterDate(date);
  var referFilter = filterDate(refer);

  if (dateFilter.year === referFilter.year) {
    if (dateFilter.month < referFilter.month) {
      which = LAST_MONTH;
    } else if (dateFilter.month > referFilter.month) {
      which = NEXT_MONTH;
    } else {
      which = CURRENT_MONTH;
    }
  } else if (dateFilter.year < referFilter.year) {
    which = LAST_MONTH;
  } else if (dateFilter.year > referFilter.year) {
    which = NEXT_MONTH;
  }

  return which;
};

var whichDay = exports.whichDay = function whichDay(d) {
  var today = new Date().setHours(0, 0, 0, 0);
  var date = newDate(d).setHours(0, 0, 0, 0);
  if (date < today) {
    return 'PAST';
  } else if (date > today) {
    return 'FUTURE';
  }
  return 'TODAY';
};

var isToday = exports.isToday = function isToday(d) {
  var today = new Date();
  var date = newDate(d);
  if (date) {
    return date.toDateString() === today.toDateString();
  }
  return false;
};

var monthDiff = exports.monthDiff = function monthDiff(d1, d2) {
  if (d1 instanceof Date && d1 instanceof Date) {
    var months = void 0;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth() + 1;
    return months <= 0 ? 0 : months;
  }
  throw new Error('need Date type');
};

var filterDataAttr = exports.filterDataAttr = function filterDataAttr(attrObj) {
  var attr = {};
  var attrArray = Object.keys(attrObj);
  attrArray.forEach(function (item) {
    attr['data-' + item] = attrObj[item];
  });

  return attr;
};
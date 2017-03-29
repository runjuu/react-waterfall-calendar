'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterDataAttribute = exports.filterSelected = exports.calculateDateInterval = exports.calculateMonthInterval = exports.filterMonth = exports.fillUpEmptyDate = exports.slice = exports.which = exports.shouldMonthComponentUpdate = exports.formatDate = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var calendarLength = 42;

var formatDate = exports.formatDate = function formatDate(day) {
  return (0, _moment2.default)(day).format('YYYY-MM-DD');
};

var shouldMonthComponentUpdate = exports.shouldMonthComponentUpdate = function shouldMonthComponentUpdate(month, selected) {
  Object.keys(selected).forEach(function (date, index) {
    if (index === 0) shouldMonthComponentUpdate.month = {};
    shouldMonthComponentUpdate.month[(0, _moment2.default)(date).format('YYYY-MM')] = true;
  });
  return shouldMonthComponentUpdate.month && shouldMonthComponentUpdate.month[month];
};

var which = exports.which = function which(diff) {
  if (diff > 0) {
    return 'FUTURE';
  } else if (diff < 0) {
    return 'PAST';
  }

  return 'CURRENT';
};

var slice = exports.slice = function slice() {
  var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  slice.month = [];

  for (var times = month.length / count; times > 0; times -= 1) {
    slice.month.push(month.slice((times - 1) * count, times * count));
  }

  return slice.month.reverse();
};

var fillUpEmptyDate = exports.fillUpEmptyDate = function fillUpEmptyDate(_ref) {
  var date = _ref.date,
      type = _ref.type,
      _ref$count = _ref.count,
      count = _ref$count === undefined ? 0 : _ref$count;

  var dateArr = [];
  if (count < 0) return dateArr;

  switch (type) {
    case 'before':
      for (var day = count; day; day -= 1) {
        dateArr.push(formatDate((0, _moment2.default)(date.subtract(1, 'days'))));
      }
      dateArr.reverse();
      break;
    case 'after':
      for (var _day = count; _day; _day -= 1) {
        dateArr.push(formatDate((0, _moment2.default)(date.add(1, 'days'))));
      }
      break;
    default:
      break;
  }

  return dateArr;
};

var filterMonth = exports.filterMonth = function filterMonth() {
  var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _moment2.default)();
  var firstWeekDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var days = [];
  var firstDateOfMonth = (0, _moment2.default)(month).date(1);

  for (var day = month.daysInMonth(); day; day -= 1) {
    days.unshift(formatDate((0, _moment2.default)(month).date(day)));
  }

  days.splice.apply(days, [0, 0].concat(_toConsumableArray(fillUpEmptyDate({
    type: 'before',
    date: firstDateOfMonth,
    count: firstDateOfMonth.day()
  }))));

  days.splice.apply(days, [days.length, 0].concat(_toConsumableArray(fillUpEmptyDate({
    type: 'after',
    date: (0, _moment2.default)(days[days.length - 1]),
    count: calendarLength - days.length
  }))));

  return days;
};

var calculateMonthInterval = exports.calculateMonthInterval = function calculateMonthInterval(from, to, firstWeekDay) {
  var interval = [];

  for (var month = (0, _moment2.default)(from); to.diff(month, 'month') >= 0; month.add(1, 'month')) {
    interval.push(slice(filterMonth(month, firstWeekDay), 7));
  }

  return interval;
};

var calculateDateInterval = exports.calculateDateInterval = function calculateDateInterval(from, to) {
  var interval = [];

  for (var days = to.diff(from, 'days'); days >= 0; days -= 1) {
    interval.unshift(formatDate((0, _moment2.default)(from).add(days, 'days')));
  }

  return interval;
};

var filterSelected = exports.filterSelected = function filterSelected(dateString) {
  var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var selectType = arguments[2];

  var date = (0, _moment2.default)(dateString);

  if (selectType === 'INTERVAL') {
    var selectedDates = Object.keys(selected);
    if (selectedDates.length <= 1) {
      var result = {};
      var minDate = date;

      selectedDates.forEach(function (d) {
        if ((0, _moment2.default)(minDate).diff(d, 'days') > 0) minDate = (0, _moment2.default)(d);
      });

      if (date.diff(minDate, 'days') < 0) return _defineProperty({}, dateString, true);

      calculateDateInterval(minDate, date).forEach(function (d) {
        result[d] = true;
      });

      return result;
    }
    return _defineProperty({}, dateString, true);
  } else if (selectType === 'MULTIPLE') {
    return Object.assign({}, selected, _defineProperty({}, dateString, true));
  } else if (selectType === 'SINGLE') {
    return _defineProperty({}, dateString, true);
  }

  return selected;
};

var filterDataAttribute = exports.filterDataAttribute = function filterDataAttribute() {
  var dataAttribute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var result = {};

  Object.keys(dataAttribute).forEach(function (dateString) {
    if (!dateString) return;
    var date = (0, _moment2.default)(dateString).format('YYYY-MM-DD');
    result[date] = result[date] || {};
    Object.keys(dataAttribute[date]).forEach(function (attribute) {
      result[date]['data-' + attribute] = dataAttribute[date][attribute];
    });
  });

  return result;
};
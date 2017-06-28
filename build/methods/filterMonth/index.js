'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _formatDate = require('../formatDate/');

var _formatDate2 = _interopRequireDefault(_formatDate);

var _fillUpEmptyDate = require('../fillUpEmptyDate/');

var _fillUpEmptyDate2 = _interopRequireDefault(_fillUpEmptyDate);

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var filterMonth = function filterMonth() {
  var month = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _moment2.default)();
  var firstWeekDay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var days = [];
  var firstDateOfMonth = (0, _moment2.default)(month).date(1);

  for (var day = month.daysInMonth(); day; day -= 1) {
    days.unshift((0, _formatDate2.default)((0, _moment2.default)(month).date(day)));
  }

  days.splice.apply(days, [0, 0].concat(_toConsumableArray((0, _fillUpEmptyDate2.default)({
    type: 'before',
    date: firstDateOfMonth,
    count: firstDateOfMonth.day()
  }))));

  days.splice.apply(days, [days.length, 0].concat(_toConsumableArray((0, _fillUpEmptyDate2.default)({
    type: 'after',
    date: (0, _moment2.default)(days[days.length - 1]),
    count: _.calendarLength - days.length
  }))));

  return days;
};

exports.default = filterMonth;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setMultipleCalendar = undefined;

var _methods = require('../methods');

var _CalendarMethods = require('../Calendar/CalendarMethods');

var setMultipleCalendar = exports.setMultipleCalendar = function setMultipleCalendar(_ref) {
  var _ref$from = _ref.from,
      from = _ref$from === undefined ? new Date() : _ref$from,
      _ref$to = _ref.to,
      to = _ref$to === undefined ? new Date() : _ref$to;

  var listOfCalendar = [];

  var _filterDate = (0, _methods.filterDate)(from),
      year = _filterDate.year,
      month = _filterDate.month;

  var numberOfMonths = (0, _methods.monthDiff)(from, to);

  for (var index = 0; index < numberOfMonths + 1; index += 1) {
    var date = new Date(year, month + index);
    var dateFilter = (0, _methods.filterDate)(date);
    listOfCalendar.push({
      monthWithYear: dateFilter.year + '-' + dateFilter.month,
      calendar: (0, _CalendarMethods.initCalendar)(date)
    });
  }

  return { listOfCalendar: listOfCalendar };
};
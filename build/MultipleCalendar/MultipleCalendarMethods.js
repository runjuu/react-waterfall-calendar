'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMultipleCalendar = undefined;

var _methods = require('../methods');

var _CalendarMethods = require('../Calendar/CalendarMethods');

var initMultipleCalendar = exports.initMultipleCalendar = function initMultipleCalendar(_ref) {
  var from = _ref.from,
      to = _ref.to;

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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _formatDate = require('../formatDate/');

var _formatDate2 = _interopRequireDefault(_formatDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calculateDateInterval = function calculateDateInterval(fromDate, toDate) {
  var interval = [];
  var from = _moment2.default.isMoment(fromDate) ? fromDate : (0, _moment2.default)(new Date(fromDate));
  var to = _moment2.default.isMoment(toDate) ? toDate : (0, _moment2.default)(new Date(toDate));

  for (var days = to.diff(from, 'days'); days >= 0; days -= 1) {
    interval.unshift((0, _formatDate2.default)((0, _moment2.default)(from).add(days, 'days')));
  }

  return interval;
};

exports.default = calculateDateInterval;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _slice = require('../slice/');

var _slice2 = _interopRequireDefault(_slice);

var _filterMonth = require('../filterMonth/');

var _filterMonth2 = _interopRequireDefault(_filterMonth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var calculateMonthInterval = function calculateMonthInterval(from, to) {
  var interval = [];

  for (var month = (0, _moment2.default)(from); (0, _moment2.default)(to).diff(month, 'month') >= 0; month.add(1, 'month')) {
    interval.push((0, _slice2.default)((0, _filterMonth2.default)(month), 7));
  }

  return interval;
};

exports.default = calculateMonthInterval;
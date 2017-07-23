'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function whichDay(diff) {
  switch (true) {
    case diff > 0:
      return 'FUTURE';
    case diff < 0:
      return 'PAST';
    default:
      return 'CURRENT';
  }
}

var which = function which(diff) {
  if (typeof diff === 'number') {
    return whichDay(diff);
  } else if (diff && (typeof diff === 'undefined' ? 'undefined' : _typeof(diff)) === 'object') {
    var currentDate = diff.current === undefined ? new Date() : new Date(diff.current);
    var targetDate = diff.target === undefined ? new Date() : new Date(diff.target);

    switch (true) {
      case currentDate.toDateString().toLowerCase().indexOf('invalid date') !== -1:
      case targetDate.toDateString().toLowerCase().indexOf('invalid date') !== -1:
      case !diff.current && diff.current !== undefined:
      case !diff.target && diff.target !== undefined:
        return null;
      default:
        return whichDay((0, _moment2.default)(diff.target).diff(diff.current, 'days'));
    }
  }
  return null;
};

exports.default = which;
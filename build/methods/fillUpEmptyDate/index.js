'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _formatDate = require('../formatDate/');

var _formatDate2 = _interopRequireDefault(_formatDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fillUpEmptyDate = function fillUpEmptyDate(_ref) {
  var date = _ref.date,
      type = _ref.type,
      _ref$count = _ref.count,
      count = _ref$count === undefined ? 0 : _ref$count;

  var dateArr = [];
  if (count < 0) return dateArr;

  switch (type) {
    case 'before':
      for (var day = count; day; day -= 1) {
        dateArr.push((0, _formatDate2.default)((0, _moment2.default)(date.subtract(1, 'days'))));
      }
      dateArr.reverse();
      break;
    case 'after':
      for (var _day = count; _day; _day -= 1) {
        dateArr.push((0, _formatDate2.default)((0, _moment2.default)(date.add(1, 'days'))));
      }
      break;
    default:
      break;
  }

  return dateArr;
};

exports.default = fillUpEmptyDate;
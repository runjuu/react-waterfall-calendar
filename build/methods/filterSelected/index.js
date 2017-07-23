'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _calculateDateInterval = require('../calculateDateInterval/');

var _calculateDateInterval2 = _interopRequireDefault(_calculateDateInterval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var filterSelected = function filterSelected(dateString) {
  var selected = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var selectType = arguments[2];

  if (!/\d{4}-\d{2}-\d{2}/.test(dateString)) return selected;

  var date = (0, _moment2.default)(dateString);

  if (!date.isValid() || date.format('YYYY-MM-DD') !== dateString) return selected;

  if (selectType === 'INTERVAL') {
    var selectedDates = Object.keys(selected).filter(function (key) {
      return selected[key];
    });
    if (selectedDates.length <= 1) {
      var result = {};
      var minDate = date;

      selectedDates.forEach(function (d) {
        if ((0, _moment2.default)(minDate).diff(d, 'days') > 0) minDate = (0, _moment2.default)(d);
      });

      if (date.diff(minDate, 'days') < 0) return _defineProperty({}, dateString, true);

      (0, _calculateDateInterval2.default)(minDate, date).forEach(function (d) {
        result[d] = true;
      });

      return result;
    }
    return _defineProperty({}, dateString, true);
  } else if (selectType === 'MULTIPLE') {
    return Object.assign({}, selected, _defineProperty({}, dateString, !selected[dateString]));
  } else if (selectType === 'SINGLE') {
    return _defineProperty({}, dateString, !selected[dateString]);
  }

  return selected;
};

exports.default = filterSelected;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initWhichMonthShouldUpdate = function initWhichMonthShouldUpdate() {
  return function whichMonthShouldUpdate() {
    var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var updateMonth = {};
    var result = _extends({}, whichMonthShouldUpdate.month || {});

    Object.keys(selected).forEach(function (date) {
      updateMonth[(0, _moment2.default)(new Date(date)).format('YYYY-MM')] = true;
    });

    whichMonthShouldUpdate.month = updateMonth;
    return Object.assign({}, result, updateMonth);
  };
};

exports.default = initWhichMonthShouldUpdate;
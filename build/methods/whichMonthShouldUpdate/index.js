'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var whichMonthShouldUpdate = function whichMonthShouldUpdate() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  whichMonthShouldUpdate.month = whichMonthShouldUpdate.month || {};

  var updateMonth = {};
  Object.keys(selected).forEach(function (date) {
    updateMonth[(0, _moment2.default)(date).format('YYYY-MM')] = true;
  });
  Object.assign(updateMonth, whichMonthShouldUpdate.month);

  whichMonthShouldUpdate.month = updateMonth;
  return updateMonth;
};

exports.default = whichMonthShouldUpdate;
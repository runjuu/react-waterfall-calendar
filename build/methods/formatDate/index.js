'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatDate = function formatDate(day) {
  return (0, _moment2.default)(day).format('YYYY-MM-DD');
};

exports.default = formatDate;
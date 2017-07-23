'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateReg = /\d{4}-\d{2}-\d{2}/;
var filterArrayOfSelected = function filterArrayOfSelected(arrayOfSelected) {
  var selected = {};
  if (arrayOfSelected instanceof Array) {
    arrayOfSelected.filter(function (dateString) {
      return typeof dateString === 'string';
    }).forEach(function (dateString) {
      var date = (0, _moment2.default)(new Date(dateString)).format('YYYY-MM-DD');
      if (dateReg.test(date)) selected[date] = true;
    });
  }
  return selected;
};

exports.default = filterArrayOfSelected;
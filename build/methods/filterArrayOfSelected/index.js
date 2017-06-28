'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterArrayOfSelected = function filterArrayOfSelected(arrayOfSelected) {
  var selected = {};
  if (arrayOfSelected instanceof Array) {
    arrayOfSelected.forEach(function (dateString) {
      if (dateString) selected[(0, _moment2.default)(dateString).format('YYYY-MM-DD')] = true;
    });
  }
  return selected;
};

exports.default = filterArrayOfSelected;
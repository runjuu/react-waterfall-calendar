'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterDataAttribute = function filterDataAttribute() {
  var dataAttribute = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var result = {};

  Object.keys(dataAttribute).forEach(function (dateString) {
    if (!dateString) return;
    var date = (0, _moment2.default)(dateString).format('YYYY-MM-DD');
    result[date] = result[date] || {};
    Object.keys(dataAttribute[date]).forEach(function (attribute) {
      result[date]['data-' + attribute] = dataAttribute[date][attribute];
    });
  });

  return result;
};

exports.default = filterDataAttribute;
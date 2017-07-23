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
    var key = (0, _moment2.default)(new Date(dateString)).format('YYYY-MM-DD');

    if (key === 'Invalid date') key = dateString;
    result[key] = result[key] || {};
    Object.keys(dataAttribute[dateString]).forEach(function (attribute) {
      result[key]['data-' + attribute] = dataAttribute[dateString][attribute];
    });
  });

  return result;
};

exports.default = filterDataAttribute;
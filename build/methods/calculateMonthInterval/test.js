'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _chai = require('chai');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  return describe('calculateMonthInterval', function () {
    it('传入起始和结束日期，返回两个日期月份间的所有日期', function () {
      var count = 0;

      var _calculateMonthInterv = (0, _index2.default)('2017-01-28', '2017-02-06'),
          _calculateMonthInterv2 = _slicedToArray(_calculateMonthInterv, 2),
          january = _calculateMonthInterv2[0],
          february = _calculateMonthInterv2[1];

      (0, _chai.expect)(january[0][0]).to.be.equal('2017-01-01');
      (0, _chai.expect)(january[3][6]).to.be.equal('2017-01-28');
      (0, _chai.expect)(february[1][1]).to.be.equal('2017-02-06');

      count = 0;
      february.forEach(function (date, index) {
        [].concat(_toConsumableArray(new Array(7))).forEach(function (value, i) {
          (0, _chai.expect)((0, _moment2.default)(february[index][i]).diff(february[0][0], 'days')).to.be.equal(count);
          count += 1;
        });
      });
      (0, _chai.expect)(count).to.be.equal(42);
    });
  });
};
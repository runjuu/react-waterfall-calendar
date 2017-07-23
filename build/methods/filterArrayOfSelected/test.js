'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('filterArrayOfSelected', function () {
    it('传入一个日期数组，返回 key 格式为 YYYY-MM-DD, value 为 true 的对象', function () {
      var arrayOfSelected = ['2017-02-06', '2017-01-28'];
      (0, _chai.expect)((0, _2.default)(arrayOfSelected)).to.deep.equal({
        '2017-02-06': true,
        '2017-01-28': true
      });
    });
    it('当数组中的值非正常的日期格式时，返回的对象中忽略该值', function () {
      var arrayOfSelected = ['2017-01-28', 'should be ignored', '2017', NaN, undefined];
      (0, _chai.expect)((0, _2.default)(arrayOfSelected)).to.deep.equal({
        '2017-01-01': true,
        '2017-01-28': true
      });
    });
  });
};
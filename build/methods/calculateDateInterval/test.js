'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _chai = require('chai');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('calculateDateInterval', function () {
    it('传入开始日期和结束日期，返回从开始日期到结束日期之间的所有日期', function () {
      var dateInterval = (0, _index2.default)('2017-01-28', '2017-02-06');
      (0, _chai.expect)(dateInterval[0]).to.be.equal('2017-01-28');
      dateInterval.forEach(function (date, index) {
        (0, _chai.expect)((0, _moment2.default)(date).diff('2017-01-28', 'days')).to.be.equal(index);
      });
    });
    it('当结束日期早于开始日期时，返回一个空数组', function () {
      return (0, _chai.expect)((0, _index2.default)('2018-01-28', '2017-02-06')).to.be.empty;
    });
  });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _3 = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('filterMonth', function () {
    var month = (0, _2.default)();
    it('filterMonth \u65B9\u6CD5\u8FD4\u56DE\u4E00\u4E2A\u6309\u65F6\u95F4\u4ECE\u65E9\u5230\u665A\u6392\u5E8F\u7684\u957F\u5EA6\u4E3A ' + _3.calendarLength + ' \u7684\u65E5\u671F\u6570\u7EC4', function () {
      (0, _chai.expect)(month).to.be.an('array').that.have.lengthOf(_3.calendarLength).that.has.all.match(/\d{4}-\d{2}-\d{2}/);
      month.forEach(function (date, index) {
        (0, _chai.expect)((0, _moment2.default)(date).diff(month[0], 'days')).to.be.equal(index);
      });
    });
    it('\u6570\u7EC4\u4E2D\u5305\u542B\u4EE5\u5468\u65E5\u4E3A\u6BCF\u5468\u7B2C\u4E00\u5929\u7684\u5F53\u6708\u65E5\u671F\uFF0C\u4EE5\u53CA\u524D\u540E\u6269\u5C55\u4EE5\u51D1\u591F ' + _3.calendarLength + '\u5929 \u7684\u65E5\u671F', function () {
      (0, _chai.expect)((0, _moment2.default)(month[0]).day()).to.be.equal(0);
      (0, _chai.expect)((0, _moment2.default)(month[_3.calendarLength - 1]).day()).to.be.equal(6);
    });
    it('支持传入不同月份的日期返回不同月份的数组', function () {
      var january = (0, _2.default)('2017');
      var february = (0, _2.default)('2017-02');
      var march = (0, _2.default)('2017-03-01');
      (0, _chai.expect)(january[27]).to.be.equal('2017-01-28');
      (0, _chai.expect)(february[8]).to.be.equal('2017-02-06');
      (0, _chai.expect)(march[6]).to.be.equal('2017-03-04');
    });
  });
};
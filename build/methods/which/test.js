'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('which', function () {
    it('传入一个对象，current、target 两个日期进行对比, 值为 undefined 时使用当前的日期进行判断，返回对应的字符串 "FUTURE" "PAST" "CURRENT"', function () {
      (0, _chai.expect)((0, _index2.default)({ current: '2017-01-28', target: '2017-02-06' })).to.be.equal('FUTURE');
      (0, _chai.expect)((0, _index2.default)({ current: '2017-02-06', target: '2017-01-28' })).to.be.equal('PAST');
      (0, _chai.expect)((0, _index2.default)({ current: '2017-07-21', target: '2017-07-21' })).to.be.equal('CURRENT');
      (0, _chai.expect)((0, _index2.default)({ current: '2017-01-28' })).to.be.equal('FUTURE');
      (0, _chai.expect)((0, _index2.default)({ target: '2097-02-06' })).to.be.equal('FUTURE');
    });
    it('传入 diff 后的数字，大于 0 时返回 "FUTURE" 小于 0 时返回 "PAST" 等于 0 时返回 "CURRENT"', function () {
      (0, _chai.expect)((0, _index2.default)(1)).to.be.equal('FUTURE');
      (0, _chai.expect)((0, _index2.default)(-1)).to.be.equal('PAST');
      (0, _chai.expect)((0, _index2.default)(0)).to.be.equal('CURRENT');
    });
    it('传入不支持的值时，以及 current、target 不能正常解析为日期时，返回 null', function () {
      (0, _chai.expect)((0, _index2.default)({ current: null })).to.be.equal(null);
      (0, _chai.expect)((0, _index2.default)({ target: 'abc' })).to.be.equal(null);
      (0, _chai.expect)((0, _index2.default)('a')).to.be.equal(null);
      (0, _chai.expect)((0, _index2.default)('2017-01-28')).to.be.equal(null);
      (0, _chai.expect)((0, _index2.default)('0')).to.be.equal(null);
      (0, _chai.expect)((0, _index2.default)(false)).to.be.equal(null);
    });
  });
};
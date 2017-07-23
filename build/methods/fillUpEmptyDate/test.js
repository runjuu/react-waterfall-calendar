'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('fillUpEmptyDate', function () {
    it('根据传入起始日期（date）和需要填充的天数（count），返回一个日期数组', function () {
      (0, _chai.expect)((0, _index2.default)({ date: '2017-02-06', count: 2 })).to.deep.equal(['2017-02-07', '2017-02-08']);
    });
    it('type 为 before 时，填充过去的天数，type 为 after 时，填充未来的天数', function () {
      (0, _chai.expect)((0, _index2.default)({ date: '2017-02-06', count: 2, type: 'after' })).to.deep.equal(['2017-02-07', '2017-02-08']);
      (0, _chai.expect)((0, _index2.default)({ date: '2017-02-06', count: 2, type: 'before' })).to.deep.equal(['2017-02-04', '2017-02-05']);
    });
  });
};
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('whichMonthShouldUpdate', function () {
    var whichMonthShouldUpdate = (0, _index2.default)();
    it('传入多次「包含日期名称」的对象，根据上一次的数据和新传入的数据返回变更涉及到的月份', function () {
      (0, _chai.expect)(whichMonthShouldUpdate({ '2017-01-28': true })).to.deep.equal({ '2017-01': true });
      (0, _chai.expect)(whichMonthShouldUpdate({ '2017-02-06': true, '2017-03-04': true })).to.deep.equal({ '2017-01': true, '2017-02': true, '2017-03': true });
      (0, _chai.expect)(whichMonthShouldUpdate({ '2017-02-16': true })).to.deep.equal({ '2017-02': true, '2017-03': true });
      (0, _chai.expect)(whichMonthShouldUpdate({ '2017-03-16': false })).to.deep.equal({ '2017-02': true, '2017-03': true });
      (0, _chai.expect)(whichMonthShouldUpdate({ '2017-03-16': false })).to.deep.equal({ '2017-03': true });
    });
  });
};
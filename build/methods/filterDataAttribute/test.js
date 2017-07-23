'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('filterDataAttribute', function () {
    it('遍历传入的对象并转化为 YYYY-MM-DD 的对象名，然后再将该格式下的可遍历对象名改为 data-* 的命名方式', function () {
      var dataAttribute = {
        '2017-1-1': { event: 'New Year' },
        '2017-01-28': { people: 'mandy', event: 'birthday' }
      };
      var result = (0, _2.default)(dataAttribute);
      (0, _chai.expect)(result).to.deep.equal({
        '2017-01-01': { 'data-event': 'New Year' },
        '2017-01-28': { 'data-people': 'mandy', 'data-event': 'birthday' }
      });
    });
    it('传入的对象中可遍历对象的名称非标注日期格式时，只将二级对象名称改为 data-* 的命名方式', function () {
      var dataAttribute = {
        abc: { type: 'alphabet' }
      };
      var result = (0, _2.default)(dataAttribute);
      (0, _chai.expect)(result).to.deep.equal({
        abc: { 'data-type': 'alphabet' }
      });
    });
  });
};
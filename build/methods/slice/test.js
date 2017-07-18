'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function () {
  return describe('slice', function () {
    var month = [].concat(_toConsumableArray(new Array(14))).map(function (value, index) {
      return index + 1;
    });
    var count = 7;
    var sliceResult = (0, _2.default)(month, count);
    it('长度为 14 的数组应当被切为两个长度为 7 的数组', function () {
      (0, _chai.expect)(sliceResult).to.have.lengthOf(2);
      (0, _chai.expect)(sliceResult[0]).to.have.lengthOf(7);
      (0, _chai.expect)(sliceResult[1]).to.have.lengthOf(7);
    });
    it('第一个数组的值为 [1, 2, 3, 4, 5, 6, 7]，第二个数组的值为 [8, 9, 10, 11, 12, 13, 14]', function () {
      (0, _chai.expect)(sliceResult[0]).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
      (0, _chai.expect)(sliceResult[1]).to.deep.equal([8, 9, 10, 11, 12, 13, 14]);
    });
  });
};
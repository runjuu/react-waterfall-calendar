'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chai = require('chai');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return describe('formatDate', function () {
    it('传入「new Date()」或者「undefined」都应当返回当前日期的 YYYY-MM-DD 格式', function () {
      (0, _chai.expect)((0, _2.default)(new Date())).to.be.equal((0, _moment2.default)(new Date()).format('YYYY-MM-DD'));
      (0, _chai.expect)((0, _2.default)()).to.be.equal((0, _moment2.default)(new Date()).format('YYYY-MM-DD'));
    });
    it('传入「new Date(2017, 0, 28)」应当返回 2017-01-28', function () {
      (0, _chai.expect)((0, _2.default)(new Date(2017, 0, 28))).to.be.equal('2017-01-28');
    });
  });
};
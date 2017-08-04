'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _State = require('./State');

var _State2 = _interopRequireDefault(_State);

var _FuncPool = require('../methods/FuncPool/');

var _FuncPool2 = _interopRequireDefault(_FuncPool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initialize(target) {
  var state = new _State2.default();

  var _ref = new _FuncPool2.default(),
      update = _ref.update,
      autoRun = _ref.autoRun,
      removeFromAutoRun = _ref.removeFromAutoRun;

  state.update = update;

  if (typeof target === 'function') {
    Object.defineProperty(target, 'state', { value: state });
    Object.defineProperty(target, 'autoRun', { value: autoRun });
    Object.defineProperty(target, 'removeFromAutoRun', { value: removeFromAutoRun });
  }

  return typeof target === 'function' ? target : { state: state, autoRun: autoRun, removeFromAutoRun: removeFromAutoRun };
}

exports.default = initialize;
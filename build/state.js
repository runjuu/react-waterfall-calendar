'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoUpdate = exports.state = undefined;

var _state = require('./methods/state/');

var _state2 = _interopRequireDefault(_state);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _initCalendar = (0, _state2.default)();

var state = _initCalendar.state,
    autoUpdate = _initCalendar.autoUpdate;
exports.state = state;
exports.autoUpdate = autoUpdate;
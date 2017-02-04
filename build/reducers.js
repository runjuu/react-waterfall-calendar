'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _CalendarReducer = require('./Calendar/CalendarReducer');

var _CalendarReducer2 = _interopRequireDefault(_CalendarReducer);

var _MultipleCalendarReducer = require('./MultipleCalendar/MultipleCalendarReducer');

var _MultipleCalendarReducer2 = _interopRequireDefault(_MultipleCalendarReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selected = _CalendarReducer2.default.selected,
    dataAttr = _CalendarReducer2.default.dataAttr;


var rootReducer = (0, _redux.combineReducers)({
  selected: selected,
  dataAttr: dataAttr,
  multipleCalendar: _MultipleCalendarReducer2.default
});

exports.default = rootReducer;
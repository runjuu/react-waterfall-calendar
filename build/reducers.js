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

var calendar = _CalendarReducer2.default.calendar,
    selected = _CalendarReducer2.default.selected,
    dateEvents = _CalendarReducer2.default.dateEvents;


var rootReducer = (0, _redux.combineReducers)({
  calendar: calendar,
  selected: selected,
  dateEvents: dateEvents,
  multipleCalendar: _MultipleCalendarReducer2.default
});

exports.default = rootReducer;
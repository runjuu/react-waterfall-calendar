'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CalendarMethods = require('./CalendarMethods');

var _CalendarActions = require('./CalendarActions');

var calendar = function calendar() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _CalendarActions.INIT_CALENDAR:
      return (0, _CalendarMethods.initCalendar)();
    default:
      return state;
  }
};

var selected = function selected() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var date = action.date,
      multipleSelect = action.multipleSelect;

  switch (action.type) {
    case _CalendarActions.SET_SELECTED:
      return (0, _CalendarMethods.setSelected)({
        date: date,
        state: state,
        multipleSelect: multipleSelect
      });
    default:
      return state;
  }
};

var dateEvents = function dateEvents() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var events = action.events;

  switch (action.type) {
    case _CalendarActions.INIT_DATE_EVENTS:
      return (0, _CalendarMethods.setDateEvents)(events);
    default:
      return state;
  }
};

exports.default = {
  calendar: calendar,
  selected: selected,
  dateEvents: dateEvents
};
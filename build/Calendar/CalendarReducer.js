'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CalendarMethods = require('./CalendarMethods');

var _CalendarActions = require('./CalendarActions');

var selected = function selected() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var date = action.date,
      _action$multipleSelec = action.multipleSelect,
      multipleSelect = _action$multipleSelec === undefined ? !!state.multipleSelect : _action$multipleSelec;

  switch (action.type) {
    case _CalendarActions.SET_SELECTED:
      return (0, _CalendarMethods.setSelected)({
        date: date,
        state: state,
        multipleSelect: !!multipleSelect
      });
    default:
      return state;
  }
};

var dataAttr = function dataAttr() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var events = action.events;

  switch (action.type) {
    case _CalendarActions.INIT_DATE_EVENTS:
      return (0, _CalendarMethods.setDataAttr)(events);
    default:
      return state;
  }
};

exports.default = {
  selected: selected,
  dataAttr: dataAttr
};
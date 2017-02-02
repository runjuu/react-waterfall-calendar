'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _MultipleCalendarMethods = require('./MultipleCalendarMethods');

var _MultipleCalendarActions = require('./MultipleCalendarActions');

var _methods = require('../methods');

var multipleCalendar = function multipleCalendar() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var _action$from = action.from,
      from = _action$from === undefined ? state.from : _action$from,
      _action$to = action.to,
      to = _action$to === undefined ? state.to : _action$to;

  switch (action.type) {
    case _MultipleCalendarActions.SET_MULTIPLECALENDAR:
      return _extends({}, (0, _MultipleCalendarMethods.setMultipleCalendar)({ from: from, to: to }));
    case _MultipleCalendarActions.ADD_MULTIPLECALENDAR:
      return _extends({}, (0, _MultipleCalendarMethods.setMultipleCalendar)({ from: from, to: (0, _methods.monthIncrease)(to, 12) }));
    case _MultipleCalendarActions.RESET_MULTIPLECALENDAR:
      return _extends({}, (0, _MultipleCalendarMethods.setMultipleCalendar)({}));
    default:
      return state;
  }
};

exports.default = multipleCalendar;
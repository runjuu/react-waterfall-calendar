'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _MultipleCalendarMethods = require('./MultipleCalendarMethods');

var _MultipleCalendarActions = require('./MultipleCalendarActions');

var multipleCalendar = function multipleCalendar() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];
  var from = action.from,
      to = action.to;

  switch (action.type) {
    case _MultipleCalendarActions.SET_MULTIPLECALENDAR:
      return _extends({}, (0, _MultipleCalendarMethods.setMultipleCalendar)({ from: from, to: to }));
    default:
      return state;
  }
};

exports.default = multipleCalendar;
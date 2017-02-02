'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_MULTIPLECALENDAR = exports.SET_MULTIPLECALENDAR = 'SET_MULTIPLECALENDAR';
var ADD_MULTIPLECALENDAR = exports.ADD_MULTIPLECALENDAR = 'ADD_MULTIPLECALENDAR';
var RESET_MULTIPLECALENDAR = exports.RESET_MULTIPLECALENDAR = 'RESET_MULTIPLECALENDAR';

var setMultipleCalendar = exports.setMultipleCalendar = function setMultipleCalendar(_ref) {
  var from = _ref.from,
      to = _ref.to;
  return {
    type: SET_MULTIPLECALENDAR,
    from: from,
    to: to
  };
};

var updateMultipleCalendar = exports.updateMultipleCalendar = function updateMultipleCalendar() {
  return {
    type: ADD_MULTIPLECALENDAR
  };
};

var resetMultipleCalendar = exports.resetMultipleCalendar = function resetMultipleCalendar() {
  return {
    type: RESET_MULTIPLECALENDAR
  };
};
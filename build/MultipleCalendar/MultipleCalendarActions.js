'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var SET_MULTIPLECALENDAR = exports.SET_MULTIPLECALENDAR = 'SET_MULTIPLECALENDAR';

var setMultipleCalendar = exports.setMultipleCalendar = function setMultipleCalendar(_ref) {
  var from = _ref.from,
      to = _ref.to;
  return {
    type: SET_MULTIPLECALENDAR,
    from: from,
    to: to
  };
};
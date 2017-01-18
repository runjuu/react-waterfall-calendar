'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var INIT_MULTIPLECALENDAR = exports.INIT_MULTIPLECALENDAR = 'INIT_MULTIPLECALENDAR';

var initMultipleCalendar = exports.initMultipleCalendar = function initMultipleCalendar(_ref) {
  var from = _ref.from,
      to = _ref.to;
  return {
    type: INIT_MULTIPLECALENDAR,
    from: from,
    to: to
  };
};
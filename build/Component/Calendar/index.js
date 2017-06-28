'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ = require('../../');

var _Month = require('../Month');

var _Month2 = _interopRequireDefault(_Month);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = function Calendar(_ref) {
  var onClick = _ref.onClick,
      classNames = _ref.classNames,
      dateFormat = _ref.dateFormat,
      monthFormat = _ref.monthFormat,
      enableTouchTap = _ref.enableTouchTap,
      updateMonth = _ref.updateMonth;
  return _react2.default.createElement(
    'div',
    { className: classNames.calendars },
    _.calendarState.calendar.map(function (month) {
      return _react2.default.createElement(_Month2.default, {
        key: month[0][0],
        month: month,
        currentMonth: (0, _moment2.default)(month[1][0]).date(1),
        onClick: onClick,
        classNames: classNames,
        dateFormat: dateFormat,
        monthFormat: monthFormat,
        enableTouchTap: enableTouchTap,
        updateMonth: updateMonth
      });
    })
  );
};

Calendar.propTypes = {
  classNames: _propTypes2.default.objectOf(_propTypes2.default.string),
  onClick: _propTypes2.default.func,
  dateFormat: _propTypes2.default.string,
  monthFormat: _propTypes2.default.string,
  enableTouchTap: _propTypes2.default.bool,
  updateMonth: _propTypes2.default.objectOf(_propTypes2.default.bool).isRequired
};

Calendar.defaultProps = {
  onClick: undefined,
  enableTouchTap: false,
  classNames: {},
  dateFormat: 'D',
  monthFormat: 'YYYY-MM'
};

exports.default = (0, _mobxReact.observer)(Calendar);
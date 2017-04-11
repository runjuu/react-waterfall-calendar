'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

var _ = require('./');

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
  classNames: _react.PropTypes.objectOf(_react.PropTypes.string),
  onClick: _react.PropTypes.func,
  dateFormat: _react.PropTypes.string,
  monthFormat: _react.PropTypes.string,
  enableTouchTap: _react2.default.PropTypes.bool,
  updateMonth: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.bool).isRequired
};

Calendar.defaultProps = {
  onClick: undefined,
  enableTouchTap: false,
  classNames: {},
  dateFormat: 'D',
  monthFormat: 'YYYY-MM'
};

exports.default = (0, _mobxReact.observer)(Calendar);
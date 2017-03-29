'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobxReact = require('mobx-react');

var _Month = require('./Month');

var _Month2 = _interopRequireDefault(_Month);

var _jss = require('./jss');

var _jss2 = _interopRequireDefault(_jss);

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Calendar = function Calendar(_ref) {
  var onClick = _ref.onClick,
      classNames = _ref.classNames;
  return _react2.default.createElement(
    'div',
    { className: _jss2.default.calendar + ' ' + (classNames.calendar || '') },
    _.calendarState.calendar.map(function (month) {
      return _react2.default.createElement(_Month2.default, {
        key: month[0][0],
        month: month,
        onClick: onClick,
        classNames: classNames
      });
    })
  );
};

Calendar.propTypes = {
  classNames: _react.PropTypes.objectOf(_react.PropTypes.string),
  onClick: _react.PropTypes.func
};

Calendar.defaultProps = {
  onClick: undefined,
  classNames: {}
};

exports.default = (0, _mobxReact.observer)(Calendar);
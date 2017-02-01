'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Calendar = require('../Calendar/');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var MultipleCalendar = function MultipleCalendar(_ref) {
  var listOfCalendar = _ref.listOfCalendar,
      customizeStyle = _ref.customizeStyle,
      defaultStyle = _ref.defaultStyle,
      props = _objectWithoutProperties(_ref, ['listOfCalendar', 'customizeStyle', 'defaultStyle']);

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(defaultStyle.root, customizeStyle.root) },
    listOfCalendar.map(function (month) {
      return _react2.default.createElement(_Calendar2.default, _extends({}, props, month.calendar, {
        key: month.monthWithYear,
        customizeStyle: customizeStyle,
        defaultStyle: defaultStyle
      }));
    })
  );
};

MultipleCalendar.propTypes = {
  defaultStyle: _react.PropTypes.objectOf(_react.PropTypes.string).isRequired,
  listOfCalendar: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    monthWithYear: _react.PropTypes.string,
    calendar: _react.PropTypes.shape({
      calendarArray: _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.shape({
        date: _react.PropTypes.string.isRequired,
        weekDay: _react.PropTypes.number.isRequired
      }))),
      month: _react.PropTypes.number,
      year: _react.PropTypes.number
    })
  })).isRequired,
  events: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    date: _react.PropTypes.string,
    onClick: _react.PropTypes.func,
    dataAttr: _react.PropTypes.object
  })),
  multipleSelect: _react.PropTypes.bool,
  customizeStyle: _react.PropTypes.shape({
    root: _react.PropTypes.string
  })
};

MultipleCalendar.defaultProps = {
  events: [],
  customizeStyle: {},
  multipleSelect: false
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state.multipleCalendar);
})(MultipleCalendar);
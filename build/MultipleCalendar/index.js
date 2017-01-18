'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Calendar = require('../Calendar/');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MultipleCalendar = function (_Component) {
  _inherits(MultipleCalendar, _Component);

  function MultipleCalendar() {
    _classCallCheck(this, MultipleCalendar);

    return _possibleConstructorReturn(this, (MultipleCalendar.__proto__ || Object.getPrototypeOf(MultipleCalendar)).apply(this, arguments));
  }

  _createClass(MultipleCalendar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          listOfCalendar = _props.listOfCalendar,
          customizeStyle = _props.customizeStyle,
          style = _props.style,
          props = _objectWithoutProperties(_props, ['listOfCalendar', 'customizeStyle', 'style']);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(style.root, customizeStyle.root) },
        listOfCalendar.map(function (month) {
          return _react2.default.createElement(_Calendar2.default, _extends({}, month.calendar, props, {
            style: style,
            key: month.monthWithYear,
            customizeStyle: customizeStyle
          }));
        })
      );
    }
  }]);

  return MultipleCalendar;
}(_react.Component);

MultipleCalendar.propTypes = {
  style: _react.PropTypes.objectOf(_react.PropTypes.string),
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
  })),
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

exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state.multipleCalendar);
})(MultipleCalendar);
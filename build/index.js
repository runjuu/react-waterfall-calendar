'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _Calendar = require('./Calendar/');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _MultipleCalendar = require('./MultipleCalendar/');

var _MultipleCalendar2 = _interopRequireDefault(_MultipleCalendar);

var _CalendarActions = require('./Calendar/CalendarActions');

var _MultipleCalendarActions = require('./MultipleCalendar/MultipleCalendarActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var middleware = [_reduxThunk2.default];

if (process.env.NODE_ENV !== 'production') {
  middleware.push((0, _reduxLogger2.default)());
}

var store = (0, _redux.createStore)(_reducers2.default, _redux.applyMiddleware.apply(undefined, middleware));

var ReactModuleCalendar = function (_Component) {
  _inherits(ReactModuleCalendar, _Component);

  function ReactModuleCalendar() {
    _classCallCheck(this, ReactModuleCalendar);

    return _possibleConstructorReturn(this, (ReactModuleCalendar.__proto__ || Object.getPrototypeOf(ReactModuleCalendar)).apply(this, arguments));
  }

  _createClass(ReactModuleCalendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var multiple = this.props.multiple;
      var from = multiple.from,
          to = multiple.to;

      if (multiple) {
        store.dispatch((0, _MultipleCalendarActions.initMultipleCalendar)({ from: from, to: to }));
      } else {
        store.dispatch((0, _CalendarActions.initCalendar)());
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          multiple = _props.multiple,
          props = _objectWithoutProperties(_props, ['multiple']);

      if (multiple) {
        return _react2.default.createElement(
          _reactRedux.Provider,
          { store: store },
          _react2.default.createElement(_MultipleCalendar2.default, _extends({
            multiple: multiple
          }, props))
        );
      }
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_Calendar2.default, _extends({
          multiple: multiple
        }, props))
      );
    }
  }], [{
    key: 'setMonthDiff',
    value: function setMonthDiff(_ref) {
      var from = _ref.from,
          to = _ref.to;

      store.dispatch((0, _MultipleCalendarActions.initMultipleCalendar)({ from: from, to: to }));
    }
  }, {
    key: 'setEvents',
    value: function setEvents(events) {
      store.dispatch((0, _CalendarActions.initDateEvents)(events));
    }
  }]);

  return ReactModuleCalendar;
}(_react.Component);

ReactModuleCalendar.propTypes = {
  event: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    date: _react.PropTypes.string,
    className: _react.PropTypes.string,
    onClick: _react.PropTypes.func,
    dataAttr: _react.PropTypes.object
  })),
  multiple: _react.PropTypes.shape({
    from: _react.PropTypes.date,
    to: _react.PropTypes.date
  }),
  customizeStyle: _react.PropTypes.shape({
    root: _react.PropTypes.string,
    calendar: _react.PropTypes.string,
    title: _react.PropTypes.string,
    week: _react.PropTypes.string,
    day: _react.PropTypes.string
  })
};

exports.default = ReactModuleCalendar;
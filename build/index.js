'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _MultipleCalendar = require('./MultipleCalendar/');

var _MultipleCalendar2 = _interopRequireDefault(_MultipleCalendar);

var _CalendarActions = require('./Calendar/CalendarActions');

var _MultipleCalendarActions = require('./MultipleCalendar/MultipleCalendarActions');

var _methods = require('./methods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var middleware = [_reduxThunk2.default];
var store = (0, _redux.createStore)(_reducers2.default, _redux.applyMiddleware.apply(undefined, middleware));

var WaterfallCalendar = function (_Component) {
  _inherits(WaterfallCalendar, _Component);

  function WaterfallCalendar() {
    _classCallCheck(this, WaterfallCalendar);

    return _possibleConstructorReturn(this, (WaterfallCalendar.__proto__ || Object.getPrototypeOf(WaterfallCalendar)).apply(this, arguments));
  }

  _createClass(WaterfallCalendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var multipleSelect = this.props.multipleSelect;

      var _filterDate = (0, _methods.filterDate)(),
          year = _filterDate.year,
          month = _filterDate.month,
          day = _filterDate.day;

      var date = year + '-' + (month + 1) + '-' + day;
      store.dispatch((0, _MultipleCalendarActions.setMultipleCalendar)(this.props.interval));
      store.dispatch((0, _CalendarActions.setSelected)({ date: date, multipleSelect: multipleSelect }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_MultipleCalendar2.default, this.props)
      );
    }
  }], [{
    key: 'setMonthDiff',
    value: function setMonthDiff(_ref) {
      var from = _ref.from,
          to = _ref.to;

      store.dispatch((0, _MultipleCalendarActions.setMultipleCalendar)({ from: from, to: to }));
    }
  }, {
    key: 'setEvents',
    value: function setEvents(events) {
      store.dispatch((0, _CalendarActions.setDateEvents)(events));
    }
  }, {
    key: 'update',
    value: function update() {
      return new Promise(function (resolve) {
        resolve(store.dispatch((0, _MultipleCalendarActions.updateMultipleCalendar)()));
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      store.dispatch((0, _MultipleCalendarActions.resetMultipleCalendar)());
    }
  }]);

  return WaterfallCalendar;
}(_react.Component);

WaterfallCalendar.propTypes = {
  interval: _react.PropTypes.shape({
    from: _react.PropTypes.date,
    to: _react.PropTypes.date
  }),
  multipleSelect: _react.PropTypes.bool
};

WaterfallCalendar.defaultProps = {
  interval: {},
  multipleSelect: false
};

exports.default = WaterfallCalendar;
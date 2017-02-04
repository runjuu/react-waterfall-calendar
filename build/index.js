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

  _createClass(WaterfallCalendar, null, [{
    key: 'setMonthDiff',
    value: function setMonthDiff(_ref) {
      var from = _ref.from,
          to = _ref.to,
          firstWeekDay = _ref.firstWeekDay;

      store.dispatch((0, _MultipleCalendarActions.setMultipleCalendar)({ from: from, to: to, firstWeekDay: firstWeekDay }));
    }
  }, {
    key: 'setDataAttr',
    value: function setDataAttr(events) {
      store.dispatch((0, _CalendarActions.setDataAttr)(events));
    }
  }, {
    key: 'setSelected',
    value: function setSelected(_ref2) {
      var date = _ref2.date,
          multipleSelect = _ref2.multipleSelect;

      store.dispatch((0, _CalendarActions.setSelected)({ date: date, multipleSelect: multipleSelect }));
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

  function WaterfallCalendar(props) {
    _classCallCheck(this, WaterfallCalendar);

    var _this = _possibleConstructorReturn(this, (WaterfallCalendar.__proto__ || Object.getPrototypeOf(WaterfallCalendar)).call(this, props));

    _this.update = _this.update.bind(_this);
    return _this;
  }

  _createClass(WaterfallCalendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.update('init');
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: 'update',
    value: function update(status) {
      var _props = this.props,
          multipleSelect = _props.multipleSelect,
          interval = _props.interval,
          firstWeekDay = _props.firstWeekDay,
          dataAttr = _props.dataAttr;

      var _filterDate = (0, _methods.filterDate)(),
          year = _filterDate.year,
          month = _filterDate.month,
          day = _filterDate.day;

      var date = year + '-' + (month + 1) + '-' + day;

      if (status === 'init') WaterfallCalendar.setMonthDiff(_extends({}, interval, { firstWeekDay: firstWeekDay }));
      if (status === 'init') WaterfallCalendar.setSelected({ date: date, multipleSelect: multipleSelect });
      WaterfallCalendar.setDataAttr(dataAttr);

      if (firstWeekDay > 6) console.error('firstWeekDay must less than 6, but input is ' + firstWeekDay);
      if (firstWeekDay < 0) console.error('firstWeekDay must greater than 0, but input is ' + firstWeekDay);
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
  }]);

  return WaterfallCalendar;
}(_react.Component);

WaterfallCalendar.propTypes = {
  interval: _react.PropTypes.shape({
    from: _react.PropTypes.date,
    to: _react.PropTypes.date
  }),
  multipleSelect: _react.PropTypes.bool,
  firstWeekDay: _react.PropTypes.number,
  dataAttr: _react.PropTypes.objectOf(_react.PropTypes.shape({
    attr: _react.PropTypes.object
  }))
};

WaterfallCalendar.defaultProps = {
  interval: {},
  dataAttr: {},
  multipleSelect: false,
  firstWeekDay: 0
};

exports.default = WaterfallCalendar;
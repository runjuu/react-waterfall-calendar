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

var _CalendarActions = require('./CalendarActions');

var _CalendarMethods = require('./CalendarMethods');

var _methods = require('../methods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    _this.handleClickEvent = _this.handleClickEvent.bind(_this);
    _this.state = {
      selected: {}
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var _props = this.props,
          year = _props.year,
          month = _props.month,
          dataAttr = _props.dataAttr,
          selected = _props.selected;

      return (0, _CalendarMethods.shouldUpdateSelected)({
        current: selected,
        next: nextProps.selected,
        date: (0, _methods.newDate)(year + '-' + (month + 1))
      }) || (0, _CalendarMethods.shouldUpdateDataAttr)({ current: dataAttr, next: nextProps.dataAttr });
    }
  }, {
    key: 'handleClickEvent',
    value: function handleClickEvent(e) {
      e.preventDefault();
      var target = e.target,
          type = e.type;
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          enableTouchTap = _props2.enableTouchTap,
          onClick = _props2.onClick;

      var date = target.getAttribute('data-date');
      if (enableTouchTap && type === 'click' || !enableTouchTap && type !== 'click') return;

      dispatch((0, _CalendarActions.setSelected)({ date: date }));
      if (typeof onClick === 'function') {
        onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var onClick = {};
      var _props3 = this.props,
          defaultStyle = _props3.defaultStyle,
          month = _props3.month,
          year = _props3.year,
          enableTouchTap = _props3.enableTouchTap,
          customizeStyle = _props3.customizeStyle,
          selected = _props3.selected,
          calendarArray = _props3.calendarArray,
          dataAttr = _props3.dataAttr;


      if (enableTouchTap) {
        onClick.onTouchTap = this.handleClickEvent;
      } else {
        onClick.onClick = this.handleClickEvent;
      }
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(defaultStyle.root, customizeStyle.calendar) },
        _react2.default.createElement(
          'h3',
          {
            'data-year': year,
            'data-month': month + 1,
            className: (0, _classnames2.default)(defaultStyle.title, customizeStyle.title)
          },
          _react2.default.createElement('span', {
            'data-year': year,
            'data-month': month + 1
          })
        ),
        calendarArray.map(function (horizontal, index) {
          return _react2.default.createElement(
            'section',
            {
              key: index,
              className: (0, _classnames2.default)(defaultStyle.horizontal, customizeStyle.week)
            },
            horizontal.map(function (vertical) {
              var date = (0, _methods.filterDate)(vertical.date);
              var data = Object.assign({}, dataAttr[vertical.date]);
              data['data-day'] = date.day;
              data['data-date'] = vertical.date;
              data['data-weekDay'] = vertical.weekDay;
              data['data-which-month'] = (0, _methods.whichMonth)({ date: vertical.date, refer: year + '-' + (month + 1) });
              data['data-which-day'] = (0, _methods.whichDay)(vertical.date);
              data['data-is-today'] = (0, _methods.isToday)(vertical.date) || undefined;
              data['data-selected'] = selected[vertical.date];
              return _react2.default.createElement(
                'a',
                _extends({}, data, onClick, {
                  key: vertical.date,
                  href: '#' + vertical.date,
                  className: (0, _classnames2.default)(defaultStyle.vertical, customizeStyle.day)
                }),
                _react2.default.createElement(
                  'span',
                  null,
                  date.day
                )
              );
            })
          );
        })
      );
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  defaultStyle: {},
  dataAttr: {},
  calendarArray: [],
  customizeStyle: {},
  selected: {},
  onClick: function onClick() {},
  enableTouchTap: false,
  multipleSelect: false
};

Calendar.propTypes = {
  dataAttr: _react.PropTypes.objectOf(_react.PropTypes.objectOf(_react.PropTypes.string)),
  calendarArray: _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.shape({
    date: _react.PropTypes.string.isRequired,
    weekDay: _react.PropTypes.number.isRequired
  }))),
  defaultStyle: _react.PropTypes.objectOf(_react.PropTypes.string),
  customizeStyle: _react.PropTypes.shape({
    calendar: _react.PropTypes.string,
    title: _react.PropTypes.string,
    week: _react.PropTypes.string,
    day: _react.PropTypes.string
  }),
  dispatch: _react.PropTypes.func.isRequired,
  onClick: _react.PropTypes.func,
  selected: _react.PropTypes.objectOf(_react.PropTypes.bool),
  enableTouchTap: _react.PropTypes.bool,
  month: _react.PropTypes.number.isRequired,
  year: _react.PropTypes.number.isRequired
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return _extends({}, state.calendar, {
    selected: state.selected,
    dataAttr: state.dataAttr
  });
})(Calendar);
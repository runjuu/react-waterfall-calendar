'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _methods = require('../../methods/');

var _Calendar = require('../Calendar/');

var _Calendar2 = _interopRequireDefault(_Calendar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Month = (_temp = _class = function (_Component) {
  _inherits(Month, _Component);

  function Month(props) {
    _classCallCheck(this, Month);

    var _this = _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Month, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(_ref) {
      var currentMonth = _ref.currentMonth;

      return !!_Calendar2.default.state.updateMonth[currentMonth.format('YYYY-MM')];
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      var onClick = this.props.onClick;

      var date = event.target.getAttribute('data-date');

      var nextSelected = Object.keys((0, _methods.filterSelected)(date, _Calendar2.default.state.selected, _Calendar2.default.state.selectType));

      if (typeof onClick === 'function') {
        Promise.all([onClick({ state: _Calendar2.default.state, event: event, date: date, nextSelected: nextSelected })]).then(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 1),
              params = _ref3[0];

          if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
            if (params !== false) _Calendar2.default.state.setSelected(date);
            return;
          }

          if (params.nextSelected) {
            _Calendar2.default.state.setSelected(undefined, (0, _methods.filterArrayOfSelected)(params.nextSelected));
          }
        });
      } else {
        _Calendar2.default.state.setSelected(date);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          month = _props.month,
          currentMonth = _props.currentMonth,
          classNames = _props.classNames,
          monthFormat = _props.monthFormat,
          dateFormat = _props.dateFormat,
          enableTouchTap = _props.enableTouchTap;

      var onClick = _defineProperty({}, enableTouchTap ? 'onTouchTap' : 'onClick', this.handleClick);
      return _react2.default.createElement(
        'div',
        { className: _style2.default.calendar + ' ' + (classNames.calendar || '') },
        _react2.default.createElement(
          'h2',
          { className: _style2.default.month + ' ' + (classNames.month || '') },
          currentMonth.format(monthFormat)
        ),
        month.map(function (horizontal) {
          return _react2.default.createElement(
            'div',
            {
              key: horizontal[0],
              className: _style2.default.horizontal + ' ' + (classNames.horizontal || '')
            },
            horizontal.map(function (date) {
              var currentDate = (0, _moment2.default)(date);
              var preDate = (0, _moment2.default)(date).subtract(1, 'days').format('YYYY-MM-DD');
              var nextDate = (0, _moment2.default)(date).add(1, 'days').format('YYYY-MM-DD');
              var dataAttribute = _Calendar2.default.state.dataAttribute[date] || {};
              var isSelected = _Calendar2.default.state.selected[date];
              return _react2.default.createElement(
                'p',
                _extends({
                  key: date,
                  className: _style2.default.date + ' ' + (classNames.date || ''),
                  'data-date': date,
                  'data-first-selected': !_Calendar2.default.state.selected[preDate] && isSelected ? '' : undefined,
                  'data-last-selected': !_Calendar2.default.state.selected[nextDate] && isSelected ? '' : undefined,
                  'data-selected': isSelected ? '' : undefined,
                  'data-which-month': (0, _methods.which)((0, _moment2.default)(currentDate).date(1).diff(currentMonth, 'month')),
                  'data-which-day': (0, _methods.which)(currentDate.diff((0, _moment2.default)().format('YYYY-MM-DD'), 'day'))
                }, onClick, dataAttribute),
                _react2.default.createElement(
                  'span',
                  null,
                  (0, _moment2.default)(date).format(dateFormat)
                )
              );
            })
          );
        })
      );
    }
  }]);

  return Month;
}(_react.Component), _class.propTypes = {
  onClick: _propTypes2.default.func,
  month: _propTypes2.default.arrayOf(_propTypes2.default.array),
  classNames: _propTypes2.default.objectOf(_propTypes2.default.string),
  dateFormat: _propTypes2.default.string.isRequired,
  monthFormat: _propTypes2.default.string.isRequired,
  enableTouchTap: _propTypes2.default.bool.isRequired,
  currentMonth: _propTypes2.default.shape({
    format: _propTypes2.default.func.isRequired
  }).isRequired
}, _class.defaultProps = {
  onClick: undefined,
  classNames: {},
  month: []
}, _temp);
exports.default = Month;
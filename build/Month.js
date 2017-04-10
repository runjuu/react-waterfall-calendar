'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mobx = require('mobx');

var _mobxReact = require('mobx-react');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jss = require('./jss');

var _jss2 = _interopRequireDefault(_jss);

var _methods = require('./methods');

var _ = require('./');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Month = (0, _mobxReact.observer)(_class = function (_Component) {
  _inherits(Month, _Component);

  function Month(props) {
    _classCallCheck(this, Month);

    var _this = _possibleConstructorReturn(this, (Month.__proto__ || Object.getPrototypeOf(Month)).call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  _createClass(Month, [{
    key: 'handleClick',
    value: function handleClick(event) {
      event.preventDefault();
      var onClick = this.props.onClick;

      var date = event.target.getAttribute('href').slice(1);

      var nextSelected = Object.keys((0, _methods.filterSelected)(date, _.calendarState.selected, _.calendarState.selectType));

      if (typeof onClick === 'function') {
        Promise.all([onClick({ state: (0, _mobx.toJS)(_.calendarState), event: event, date: date, nextSelected: nextSelected })]).then(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 1),
              _ref2$ = _ref2[0],
              params = _ref2$ === undefined ? {} : _ref2$;

          if (params && params.nextSelected) {
            var paramsNextSelected = {};
            if (params.nextSelected instanceof Array) {
              params.nextSelected.forEach(function (dateString) {
                if (dateString) paramsNextSelected[(0, _moment2.default)(dateString).format('YYYY-MM-DD')] = true;
              });
            }
            _.calendarState.setSelected(undefined, paramsNextSelected);
          } else if (params !== false) {
            _.calendarState.setSelected(date);
          }
        });
      } else {
        _.calendarState.setSelected(date);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          month = _props.month,
          classNames = _props.classNames,
          monthFormat = _props.monthFormat,
          dateFormat = _props.dateFormat;

      var currentMonth = (0, _moment2.default)(month[1][0]).date(1);
      console.log(monthFormat, dateFormat);
      return _react2.default.createElement(
        'div',
        { className: _jss2.default.month + ' ' + (classNames.month || '') },
        _react2.default.createElement(
          'h2',
          null,
          currentMonth.format(monthFormat)
        ),
        month.map(function (horizontal) {
          return _react2.default.createElement(
            'div',
            { key: horizontal[0], className: _jss2.default.horizontal + ' ' + (classNames.horizontal || '') },
            horizontal.map(function (date) {
              var currentDate = (0, _moment2.default)(date);
              var dataAttribute = _.calendarState.dataAttribute[date] || {};
              return _react2.default.createElement(
                'a',
                _extends({
                  key: date,
                  href: '#' + date,
                  onClick: _this2.handleClick,
                  className: classNames.date,
                  'data-selected': _.calendarState.selected[date] ? '' : undefined,
                  'data-which-month': (0, _methods.which)((0, _moment2.default)(currentDate).date(1).diff(currentMonth, 'month')),
                  'data-which-day': (0, _methods.which)(currentDate.diff((0, _moment2.default)().format('YYYY-MM-DD'), 'day'))
                }, dataAttribute),
                (0, _moment2.default)(date).format(dateFormat)
              );
            })
          );
        })
      );
    }
  }]);

  return Month;
}(_react.Component)) || _class;

Month.propTypes = {
  onClick: _react2.default.PropTypes.func,
  month: _mobxReact.PropTypes.observableArrayOf(_mobxReact.PropTypes.objectOrObservableObject.isRequired),
  classNames: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.string),
  dateFormat: _react2.default.PropTypes.string.isRequired,
  monthFormat: _react2.default.PropTypes.string.isRequired
};

Month.defaultProps = {
  onClick: undefined,
  classNames: {},
  month: []
};

exports.default = Month;
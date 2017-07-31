'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Month = require('../Month');

var _Month2 = _interopRequireDefault(_Month);

var _State = require('../../State/');

var _State2 = _interopRequireDefault(_State);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = (0, _State2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

    Calendar.state.init(_extends({}, _this.props, { nextSelected: _this.props.defaultSelected }));
    Calendar.autoRun(_this.forceUpdate.bind(_this));
    return _this;
  }

  _createClass(Calendar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: this.props.classNames.calendars },
        Calendar.state.calendar.map(function (month) {
          return _react2.default.createElement(_Month2.default, {
            key: month[0][0],
            month: month,
            currentMonth: (0, _moment2.default)(month[1][0]).date(1),
            onClick: _this2.props.onClick,
            classNames: _this2.props.classNames,
            dateFormat: _this2.props.dateFormat,
            monthFormat: _this2.props.monthFormat,
            enableTouchTap: _this2.props.enableTouchTap
          });
        })
      );
    }
  }]);

  return Calendar;
}(_react.Component), _class2.propTypes = {
  classNames: _propTypes2.default.objectOf(_propTypes2.default.string),
  onClick: _propTypes2.default.func,
  dateFormat: _propTypes2.default.string,
  monthFormat: _propTypes2.default.string,
  enableTouchTap: _propTypes2.default.bool,
  defaultSelected: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class2.defaultProps = {
  onClick: null,
  enableTouchTap: false,
  classNames: {},
  dateFormat: 'D',
  monthFormat: 'YYYY-MM',
  defaultSelected: null
}, _temp)) || _class;

exports.default = Calendar;
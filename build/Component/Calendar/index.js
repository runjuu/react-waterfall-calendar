'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _state = require('../../state');

var _Month = require('../Month');

var _Month2 = _interopRequireDefault(_Month);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var Calendar = (_class = (_temp = _class2 = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
  }

  _createClass(Calendar, [{
    key: 'render',
    value: function render(calendar) {
      var _props = this.props,
          onClick = _props.onClick,
          classNames = _props.classNames,
          dateFormat = _props.dateFormat,
          monthFormat = _props.monthFormat,
          enableTouchTap = _props.enableTouchTap;

      return _react2.default.createElement(
        'div',
        { className: classNames.calendars },
        calendar.map(function (month) {
          return _react2.default.createElement(_Month2.default, {
            key: month[0][0],
            month: month,
            currentMonth: (0, _moment2.default)(month[1][0]).date(1),
            onClick: onClick,
            classNames: classNames,
            dateFormat: dateFormat,
            monthFormat: monthFormat,
            enableTouchTap: enableTouchTap
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
  enableTouchTap: _propTypes2.default.bool
}, _class2.defaultProps = {
  onClick: undefined,
  enableTouchTap: false,
  classNames: {},
  dateFormat: 'D',
  monthFormat: 'YYYY-MM'
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'render', [_state.autoUpdate], Object.getOwnPropertyDescriptor(_class.prototype, 'render'), _class.prototype)), _class);
exports.default = Calendar;
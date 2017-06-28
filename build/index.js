'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calendarState = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mobxReact = require('mobx-react');

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _Component2 = require('./Component/');

var _methods = require('./methods/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var calendarState = exports.calendarState = new _state2.default();

var Wrapper = (0, _mobxReact.observer)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Wrapper, _Component);

  function Wrapper(props) {
    _classCallCheck(this, Wrapper);

    var _this = _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call(this, props));

    var nextSelected = (0, _methods.filterArrayOfSelected)(_this.props.defaultSelected);
    calendarState.init(_extends({}, _this.props, { nextSelected: nextSelected }));
    return _this;
  }

  _createClass(Wrapper, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextSelected = (0, _methods.filterArrayOfSelected)(nextProps.defaultSelected);
      calendarState.init(_extends({}, this.props, { nextSelected: nextSelected }));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Component2.Calendar, _extends({}, this.props, {
        updateMonth: calendarState.updateMonth,
        defaultSelected: this.props.defaultSelected
      }));
    }
  }]);

  return Wrapper;
}(_react.Component), _class2.propTypes = {
  defaultSelected: _propTypes2.default.arrayOf(_propTypes2.default.string)
}, _class2.defaultProps = {
  defaultSelected: []
}, _temp)) || _class;

exports.default = Wrapper;
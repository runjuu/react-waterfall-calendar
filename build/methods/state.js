'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _methods = require('./methods/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var State = function () {
  function State() {
    _classCallCheck(this, State);

    this.calendar = [];
    this.selected = {};
    this.dataAttribute = {};
    this.updateMonth = {};
    this.selectType = 'SINGLE';
  }

  _createClass(State, [{
    key: 'init',
    value: function init(_ref) {
      var interval = _ref.interval,
          selectType = _ref.selectType,
          dataAttribute = _ref.dataAttribute,
          nextSelected = _ref.nextSelected;

      if (interval) this.setInterval(interval);
      if (dataAttribute) this.setDataAttribute(dataAttribute);
      if (nextSelected) this.setSelected(undefined, nextSelected);
      this.selectType = selectType || this.selectType;
    }
  }, {
    key: 'getMonth',
    value: function getMonth(m) {
      var month = _moment2.default.isMoment(m) ? m : (0, _moment2.default)(new Date(m));
    }
  }, {
    key: 'setInterval',
    value: function setInterval() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          from = _ref2.from,
          to = _ref2.to,
          months = _ref2.months,
          firstWeekDay = _ref2.firstWeekDay;

      this.calendar = (0, _methods.calculateMonthInterval)((0, _moment2.default)(from), months ? (0, _moment2.default)(from).date(1).add(months > 0 ? months - 1 : 0, 'months') : (0, _moment2.default)(to), firstWeekDay);
    }
  }, {
    key: 'setSelected',
    value: function setSelected(date, nextSelected) {
      this.selected = nextSelected || (0, _methods.filterSelected)(date, this.selected, this.selectType);
      this.updateMonth = (0, _methods.whichMonthShouldUpdate)(this.selected);
    }
  }, {
    key: 'setDataAttribute',
    value: function setDataAttribute(dataAttribute) {
      this.dataAttribute = (0, _methods.filterDataAttribute)(dataAttribute);
    }
  }]);

  return State;
}();

function initialize() {
  var state = new State();
  var update = void 0;

  function month() {
    var descriptor = arguments.length <= 2 ? undefined : arguments[2];
    var oldRender = descriptor.value;

    descriptor.value = function render() {
      return oldRender.call(this, state.getMonth(this.props.month));
    };
    return descriptor;
  }

  function calendar() {
    var descriptor = arguments.length <= 2 ? undefined : arguments[2];
    var oldRender = descriptor.value;

    descriptor.value = function render() {
      if (!update) update = this.forceUpdate.bind(this);
      return oldRender.call(this, state);
    };
    return descriptor;
  }

  return {
    state: state,
    month: month,
    calendar: calendar
  };
}

exports.default = initialize;
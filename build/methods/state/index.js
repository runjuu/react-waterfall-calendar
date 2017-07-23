'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _calculateMonthInterval = require('../calculateMonthInterval/');

var _calculateMonthInterval2 = _interopRequireDefault(_calculateMonthInterval);

var _filterSelected = require('../filterSelected/');

var _filterSelected2 = _interopRequireDefault(_filterSelected);

var _filterDataAttribute = require('../filterDataAttribute/');

var _filterDataAttribute2 = _interopRequireDefault(_filterDataAttribute);

var _whichMonthShouldUpdate = require('../whichMonthShouldUpdate/');

var _whichMonthShouldUpdate2 = _interopRequireDefault(_whichMonthShouldUpdate);

var _filterArrayOfSelected = require('../filterArrayOfSelected/');

var _filterArrayOfSelected2 = _interopRequireDefault(_filterArrayOfSelected);

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
    this.update = null;
  }

  _createClass(State, [{
    key: 'reRender',
    value: function reRender() {
      if (typeof this.update === 'function') this.update();
    }
  }, {
    key: 'init',
    value: function init(_ref) {
      var interval = _ref.interval,
          selectType = _ref.selectType,
          dataAttribute = _ref.dataAttribute,
          nextSelected = _ref.nextSelected;

      if (interval) this.setInterval(interval, true);
      if (dataAttribute) this.setDataAttribute(dataAttribute, true);
      if (nextSelected) this.setSelected(undefined, nextSelected, true);
      this.selectType = selectType || this.selectType;
    }
  }, {
    key: 'setInterval',
    value: function setInterval() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          from = _ref2.from,
          to = _ref2.to,
          months = _ref2.months,
          firstWeekDay = _ref2.firstWeekDay;

      var shouldNotUpdate = arguments[1];

      this.calendar = (0, _calculateMonthInterval2.default)((0, _moment2.default)(from), months ? (0, _moment2.default)(from).date(1).add(months > 0 ? months - 1 : 0, 'months') : (0, _moment2.default)(to), firstWeekDay);
      if (!shouldNotUpdate) this.reRender();
    }
  }, {
    key: 'setSelected',
    value: function setSelected(date, nextSelected, shouldNotUpdate) {
      this.selected = nextSelected || (0, _filterSelected2.default)(date, this.selected, this.selectType);
      this.updateMonth = (0, _whichMonthShouldUpdate2.default)(this.selected);
      if (!shouldNotUpdate) this.reRender();
    }
  }, {
    key: 'setDataAttribute',
    value: function setDataAttribute(dataAttribute, shouldNotUpdate) {
      this.dataAttribute = (0, _filterDataAttribute2.default)(dataAttribute);
      if (!shouldNotUpdate) this.reRender();
    }
  }]);

  return State;
}();

function initialize() {
  var state = new State();

  function autoUpdate() {
    var descriptor = arguments.length <= 2 ? undefined : arguments[2];
    var oldRender = descriptor.value;

    descriptor.value = function render() {
      if (!state.update) {
        state.update = this.forceUpdate.bind(this);
        state.init(_extends({}, this.props, {
          nextSelected: (0, _filterArrayOfSelected2.default)(this.props.defaultSelected)
        }));
      }
      return oldRender.call(this, state.calendar);
    };
    return descriptor;
  }

  return {
    state: state,
    autoUpdate: autoUpdate
  };
}

exports.default = initialize;
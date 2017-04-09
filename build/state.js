'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var _mobx = require('mobx');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _methods = require('./methods');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

var State = (_class = function () {
  function State() {
    _classCallCheck(this, State);

    _initDefineProp(this, 'calendar', _descriptor, this);

    _initDefineProp(this, 'selected', _descriptor2, this);

    _initDefineProp(this, 'dataAttribute', _descriptor3, this);

    _initDefineProp(this, 'selectType', _descriptor4, this);
  }

  _createClass(State, [{
    key: 'init',
    value: function init(_ref) {
      var interval = _ref.interval,
          selectType = _ref.selectType,
          dataAttribute = _ref.dataAttribute;

      this.setInterval(interval);
      this.setDataAttribute(dataAttribute);
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

      this.calendar = (0, _methods.calculateMonthInterval)((0, _moment2.default)(from), months ? (0, _moment2.default)(from).add(months, 'months') : (0, _moment2.default)(to), firstWeekDay);
    }
  }, {
    key: 'setSelected',
    value: function setSelected(date, nextSelected) {
      this.selected = nextSelected || (0, _methods.filterSelected)(date, this.selected, this.selectType);
      (0, _methods.shouldMonthComponentUpdate)(undefined, this.selected);
    }
  }, {
    key: 'setDataAttribute',
    value: function setDataAttribute(dataAttribute) {
      this.dataAttribute = (0, _methods.filterDataAttribute)(dataAttribute);
    }
  }]);

  return State;
}(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'calendar', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'selected', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'dataAttribute', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'selectType', [_mobx.observable], {
  enumerable: true,
  initializer: function initializer() {
    return 'SINGLE';
  }
}), _applyDecoratedDescriptor(_class.prototype, 'init', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setInterval', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setInterval'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setSelected', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setSelected'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setDataAttribute', [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, 'setDataAttribute'), _class.prototype)), _class);
exports.default = State;
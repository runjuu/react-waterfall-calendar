'use strict';

var _chai = require('chai');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('State', function () {
  var count = 0;
  var counter = function counter() {
    count += 1;
  };

  var _initialize = (0, _index2.default)(),
      state = _initialize.state,
      autoRun = _initialize.autoRun,
      removeFromAutoRun = _initialize.removeFromAutoRun;

  autoRun(counter);
  describe('initialize 调用后返回 { state, autoRun, removeFromAutoRun }', function () {
    it('调用时传入一个 function，会将三个属性绑定到函数上并返回该函数', function () {
      function Calendar() {}
      var calendar = (0, _index2.default)(Calendar);
      (0, _chai.expect)(calendar).to.have.property('state').to.be.an('object');
      (0, _chai.expect)(calendar).to.have.property('autoRun').to.be.an('function');
      (0, _chai.expect)(calendar).to.have.property('removeFromAutoRun').to.be.an('function');
    });
  });
  describe('autoRun 支持传入一个 function, 会在调用 reRender 后调用', function () {
    count = 0;
    state.reRender();
    (0, _chai.expect)(count).to.be.equal(1);
  });
  describe('removeFromAutoRun 支持传入一个 function, 再调用 reRender 时则不会自动调用在 autoRun 中注册的方法', function () {
    count = 0;
    state.reRender();
    (0, _chai.expect)(count).to.be.equal(1);

    removeFromAutoRun(counter);
    state.reRender();
    (0, _chai.expect)(count).to.be.equal(1);
  });
  describe('state 有 calendar、selected、dataAttribute、updateMonth、selectType 等属性', function () {
    it('state.calendar 为数组类型', function () {
      (0, _chai.expect)(state).to.have.property('calendar').to.be.an('array');
    });
    it('state.selected 为一个对象，其中的属性名为被选中的日期', function () {
      (0, _chai.expect)(state).to.have.property('selected').to.be.an('object');
    });
    it('state.dataAttribute 为一个对象，其中第一级属性名为日期格式，值为 data-* 开头的对象', function () {
      (0, _chai.expect)(state).to.have.property('dataAttribute').to.be.an('object');
    });
    it('state.updateMonth 为一个对象，在更新 state.selected 后会返回本次需要重新渲染的日期，格式为 { "YYYY-MM": true }', function () {
      (0, _chai.expect)(state).to.have.property('updateMonth').to.be.an('object');
    });
    it('state.selectType 为一个字符串，可选值有 "INTERVAL" || "MULTIPLE" || "SINGLE"', function () {
      (0, _chai.expect)(state).to.have.property('selectType').to.be.an('string');
    });
  });
  describe('state 有 init、setInterval、setSelected、setDataAttribute、reRender 等方法', function () {
    (0, _chai.expect)(state).to.have.property('init').to.be.an('function');
    (0, _chai.expect)(state).to.have.property('setInterval').to.be.an('function');
    (0, _chai.expect)(state).to.have.property('setSelected').to.be.an('function');
    (0, _chai.expect)(state).to.have.property('setDataAttribute').to.be.an('function');
    (0, _chai.expect)(state).to.have.property('reRender').to.be.an('function');

    describe('setInterval 根据传入的 { from, to, months } 设置对应的 state.calendar', function () {
      it('{ from, to } 格式为符合 ISO 8601 的 String 类型', function () {
        state.setInterval({ from: new Date(2017, 0), to: new Date(2017, 1) });
        (0, _chai.expect)(state.calendar).to.have.lengthOf(2);
        (0, _chai.expect)(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        (0, _chai.expect)(state.calendar[1][0][3]).to.be.equal('2017-02-01');
      });
      it('{ months } 格式为大于0的 Number 类型，当 { from } 为 undefined 时从当前月份开始计算', function () {
        state.setInterval({ from: new Date(2017, 0), months: 3 });
        (0, _chai.expect)(state.calendar).to.have.lengthOf(3);
        (0, _chai.expect)(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        (0, _chai.expect)(state.calendar[1][0][3]).to.be.equal('2017-02-01');
        (0, _chai.expect)(state.calendar[2][0][3]).to.be.equal('2017-03-01');

        state.setInterval({ months: 2 });
        (0, _chai.expect)(state.calendar).to.have.lengthOf(2);
        (0, _chai.expect)((0, _moment2.default)(new Date(state.calendar[0][1][0])).format('YYYY-MM')).to.be.equal((0, _moment2.default)().format('YYYY-MM'));
        (0, _chai.expect)((0, _moment2.default)(new Date(state.calendar[1][1][0])).format('YYYY-MM')).to.be.equal((0, _moment2.default)().add(1, 'months').format('YYYY-MM'));
      });
      it('当 { months } !== undefined 时，{ to } 将不起任何作用', function () {
        state.setInterval({ from: new Date(2017, 0), to: new Date(2018, 0), months: 3 });
        (0, _chai.expect)(state.calendar).to.have.lengthOf(3);
        (0, _chai.expect)(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        (0, _chai.expect)(state.calendar[1][0][3]).to.be.equal('2017-02-01');
        (0, _chai.expect)(state.calendar[2][0][3]).to.be.equal('2017-03-01');
      });
    });
    describe('setSelected 接受三个参数 date, nextSelected, shouldNotUpdate', function () {
      it('date 为必传参数，根据 state.selectType 设置不同的 state.selected', function () {
        state.selectType = 'SINGLE';
        state.setSelected('2017-01-28');
        (0, _chai.expect)(state.selected).to.deep.equal({ '2017-01-28': true });
        state.setSelected('2017-02-06');
        (0, _chai.expect)(state.selected).to.deep.equal({ '2017-02-06': true });

        state.selectType = 'MULTIPLE';
        state.setSelected('2017-01-01');
        (0, _chai.expect)(state.selected).to.deep.equal({ '2017-02-06': true, '2017-01-01': true });
        state.setSelected('2017-01-02');
        (0, _chai.expect)(state.selected).to.deep.equal({ '2017-02-06': true, '2017-01-01': true, '2017-01-02': true });

        state.selectType = 'INTERVAL';
        state.setSelected('2017-01-01');
        (0, _chai.expect)(state.selected).to.deep.equal({ '2017-01-01': true });
        state.setSelected('2017-01-03');
        (0, _chai.expect)(state.selected).to.deep.equal({
          '2017-01-01': true,
          '2017-01-02': true,
          '2017-01-03': true
        });
      });
      it('当传了 nextSelected 时，date 值无效，state.selected 为 nextSelected 的值', function () {
        var nextSelected = { '2017-02-06': true };
        state.setSelected('2017-01-28', nextSelected);
        (0, _chai.expect)(state.selected).to.be.equal(nextSelected);
      });
    });
    describe('setDataAttribute 接受两个参数 dataAttribute, shouldNotUpdate', function () {
      it('state.dataAttribute = filterDataAttribute(dataAttribute)', function () {
        state.setDataAttribute({
          '2017-01-01': {
            event: 'new year'
          }
        });
        (0, _chai.expect)(state.dataAttribute).to.deep.equal({
          '2017-01-01': {
            'data-event': 'new year'
          }
        });
      });
    });
    describe('init 接受四个参数 { interval, selectType, dataAttribute, nextSelected }', function () {
      it('' + '调用 setInterval 处理 interval；' + '调用 setSelected 处理 nextSelected；' + '调用 setDataAttribute 处理 dataAttribute；' + '根据传入的 selectType 更新 state 中的 selectType', function () {
        state.init({
          interval: { from: new Date(2017, 0), to: new Date(2017, 1) },
          nextSelected: { '2017-01-01': true },
          dataAttribute: { '2017-01-01': { event: 'new year' } },
          selectType: 'INTERVAL'
        });

        (0, _chai.expect)(state.selectType).to.be.equal('INTERVAL');
        (0, _chai.expect)(state.calendar).to.have.lengthOf(2);
        (0, _chai.expect)(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        (0, _chai.expect)(state.calendar[1][0][3]).to.be.equal('2017-02-01');
        (0, _chai.expect)(state.selected).to.deep.equal({ '2017-01-01': true });
        (0, _chai.expect)(state.dataAttribute).to.deep.equal({ '2017-01-01': { 'data-event': 'new year' } });

        state.setSelected('2017-01-03');
        (0, _chai.expect)(state.selected).to.deep.equal({
          '2017-01-01': true,
          '2017-01-02': true,
          '2017-01-03': true
        });
        state.setSelected('2017-01-04');
        (0, _chai.expect)(state.selected).to.deep.equal({ '2017-01-04': true });
      });

      it('调用 setInterval、setSelected、setDataAttribute、init 会触发 reRender 方法, 最后一个参数传入 false 时则不会触发 reRender', function () {
        count = 0;
        autoRun(counter);

        state.init({
          interval: { from: new Date(2017, 0), to: new Date(2017, 1) },
          nextSelected: { '2017-01-01': true },
          dataAttribute: { '2017-01-01': { event: 'new year' } },
          selectType: 'INTERVAL'
        });
        state.setSelected('2017-01-04');
        state.setInterval({ from: new Date(2017, 0), to: new Date(2018, 0), months: 3 });
        state.setDataAttribute({ '2017-01-01': { event: 'new year' } });

        state.init({
          interval: { from: new Date(2017, 0), to: new Date(2017, 1) },
          nextSelected: { '2017-01-01': true },
          dataAttribute: { '2017-01-01': { event: 'new year' } },
          selectType: 'INTERVAL'
        }, false);
        state.setSelected('2017-01-04', null, false);
        state.setInterval({ from: new Date(2017, 0), to: new Date(2018, 0), months: 3 }, false);
        state.setDataAttribute({ '2017-01-01': { event: 'new year' } }, false);

        removeFromAutoRun(counter);
        (0, _chai.expect)(count).to.be.equal(4);
      });
    });
  });
});
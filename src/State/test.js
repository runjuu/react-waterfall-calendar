import { expect } from 'chai';
import moment from 'moment';
import initialize from './index';

describe('State', () => {
  let count = 0;
  const counter = () => { count += 1; };
  const { state, autoRun, removeFromAutoRun } = initialize();

  autoRun(counter);
  describe('initialize 调用后返回 { state, autoRun, removeFromAutoRun }', () => {
    it('调用时传入一个 function，会将三个属性绑定到函数上并返回该函数', () => {
      function Calendar() {}
      const calendar = initialize(Calendar);
      expect(calendar).to.have.property('state').to.be.an('object');
      expect(calendar).to.have.property('autoRun').to.be.an('function');
      expect(calendar).to.have.property('removeFromAutoRun').to.be.an('function');
    });
  });
  describe('autoRun 支持传入一个 function, 会在调用 reRender 后调用', () => {
    count = 0;
    state.reRender();
    expect(count).to.be.equal(1);
  });
  describe('removeFromAutoRun 支持传入一个 function, 再调用 reRender 时则不会自动调用在 autoRun 中注册的方法', () => {
    count = 0;
    state.reRender();
    expect(count).to.be.equal(1);

    removeFromAutoRun(counter);
    state.reRender();
    expect(count).to.be.equal(1);
  });
  describe('state 有 calendar、selected、dataAttribute、updateMonth、selectType 等属性', () => {
    it('state.calendar 为数组类型', () => {
      expect(state).to.have.property('calendar').to.be.an('array');
    });
    it('state.selected 为一个对象，其中的属性名为被选中的日期', () => {
      expect(state).to.have.property('selected').to.be.an('object');
    });
    it('state.dataAttribute 为一个对象，其中第一级属性名为日期格式，值为 data-* 开头的对象', () => {
      expect(state).to.have.property('dataAttribute').to.be.an('object');
    });
    it('state.updateMonth 为一个对象，在更新 state.selected 后会返回本次需要重新渲染的日期，格式为 { "YYYY-MM": true }', () => {
      expect(state).to.have.property('updateMonth').to.be.an('object');
    });
    it('state.selectType 为一个字符串，可选值有 "INTERVAL" || "MULTIPLE" || "SINGLE"', () => {
      expect(state).to.have.property('selectType').to.be.an('string');
    });
  });
  describe('state 有 init、setInterval、setSelected、setDataAttribute、reRender 等方法', () => {
    expect(state).to.have.property('init').to.be.an('function');
    expect(state).to.have.property('setInterval').to.be.an('function');
    expect(state).to.have.property('setSelected').to.be.an('function');
    expect(state).to.have.property('setDataAttribute').to.be.an('function');
    expect(state).to.have.property('reRender').to.be.an('function');

    describe('setInterval 根据传入的 { from, to, months } 设置对应的 state.calendar', () => {
      it('{ from, to } 格式为符合 ISO 8601 的 String 类型', () => {
        state.setInterval({ from: new Date(2017, 0), to: new Date(2017, 1) });
        expect(state.calendar).to.have.lengthOf(2);
        expect(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        expect(state.calendar[1][0][3]).to.be.equal('2017-02-01');
      });
      it('{ months } 格式为大于0的 Number 类型，当 { from } 为 undefined 时从当前月份开始计算', () => {
        state.setInterval({ from: new Date(2017, 0), months: 3 });
        expect(state.calendar).to.have.lengthOf(3);
        expect(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        expect(state.calendar[1][0][3]).to.be.equal('2017-02-01');
        expect(state.calendar[2][0][3]).to.be.equal('2017-03-01');

        state.setInterval({ months: 2 });
        expect(state.calendar).to.have.lengthOf(2);
        expect(moment(new Date(state.calendar[0][1][0])).format('YYYY-MM')).to.be.equal(moment().format('YYYY-MM'));
        expect(moment(new Date(state.calendar[1][1][0])).format('YYYY-MM')).to.be.equal(moment().add(1, 'months').format('YYYY-MM'));
      });
      it('当 { months } !== undefined 时，{ to } 将不起任何作用', () => {
        state.setInterval({ from: new Date(2017, 0), to: new Date(2018, 0), months: 3 });
        expect(state.calendar).to.have.lengthOf(3);
        expect(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        expect(state.calendar[1][0][3]).to.be.equal('2017-02-01');
        expect(state.calendar[2][0][3]).to.be.equal('2017-03-01');
      });
    });
    describe('setSelected 接受三个参数 date, nextSelected, shouldNotUpdate', () => {
      it('date 为必传参数，根据 state.selectType 设置不同的 state.selected', () => {
        state.selectType = 'SINGLE';
        state.setSelected('2017-01-28');
        expect(state.selected).to.deep.equal({ '2017-01-28': true });
        state.setSelected('2017-02-06');
        expect(state.selected).to.deep.equal({ '2017-02-06': true });

        state.selectType = 'MULTIPLE';
        state.setSelected('2017-01-01');
        expect(state.selected).to.deep.equal({ '2017-02-06': true, '2017-01-01': true });
        state.setSelected('2017-01-02');
        expect(state.selected).to.deep.equal({ '2017-02-06': true, '2017-01-01': true, '2017-01-02': true });

        state.selectType = 'INTERVAL';
        state.setSelected('2017-01-01');
        expect(state.selected).to.deep.equal({ '2017-01-01': true });
        state.setSelected('2017-01-03');
        expect(state.selected).to.deep.equal({
          '2017-01-01': true,
          '2017-01-02': true,
          '2017-01-03': true,
        });
      });
      it('当传了 nextSelected 时，date 值无效，state.selected 为 nextSelected 的值', () => {
        const nextSelected = { '2017-02-06': true };
        state.setSelected('2017-01-28', nextSelected);
        expect(state.selected).to.be.equal(nextSelected);
      });
    });
    describe('setDataAttribute 接受两个参数 dataAttribute, shouldNotUpdate', () => {
      it('state.dataAttribute = filterDataAttribute(dataAttribute)', () => {
        state.setDataAttribute({
          '2017-01-01': {
            event: 'new year',
          },
        });
        expect(state.dataAttribute).to.deep.equal({
          '2017-01-01': {
            'data-event': 'new year',
          },
        });
      });
    });
    describe('init 接受四个参数 { interval, selectType, dataAttribute, nextSelected }', () => {
      it('' +
        '调用 setInterval 处理 interval；' +
        '调用 setSelected 处理 nextSelected；' +
        '调用 setDataAttribute 处理 dataAttribute；' +
        '根据传入的 selectType 更新 state 中的 selectType', () => {
        state.init({
          interval: { from: new Date(2017, 0), to: new Date(2017, 1) },
          nextSelected: { '2017-01-01': true },
          dataAttribute: { '2017-01-01': { event: 'new year' } },
          selectType: 'INTERVAL',
        });

        expect(state.selectType).to.be.equal('INTERVAL');
        expect(state.calendar).to.have.lengthOf(2);
        expect(state.calendar[0][0][0]).to.be.equal('2017-01-01');
        expect(state.calendar[1][0][3]).to.be.equal('2017-02-01');
        expect(state.selected).to.deep.equal({ '2017-01-01': true });
        expect(state.dataAttribute).to.deep.equal({ '2017-01-01': { 'data-event': 'new year' } });

        state.setSelected('2017-01-03');
        expect(state.selected).to.deep.equal({
          '2017-01-01': true,
          '2017-01-02': true,
          '2017-01-03': true,
        });
        state.setSelected('2017-01-04');
        expect(state.selected).to.deep.equal({ '2017-01-04': true });
      });

      it('调用 setInterval、setSelected、setDataAttribute、init 会触发 reRender 方法, 最后一个参数传入 false 时则不会触发 reRender', () => {
        count = 0;
        autoRun(counter);

        state.init({
          interval: { from: new Date(2017, 0), to: new Date(2017, 1) },
          nextSelected: { '2017-01-01': true },
          dataAttribute: { '2017-01-01': { event: 'new year' } },
          selectType: 'INTERVAL',
        });
        state.setSelected('2017-01-04');
        state.setInterval({ from: new Date(2017, 0), to: new Date(2018, 0), months: 3 });
        state.setDataAttribute({ '2017-01-01': { event: 'new year' } });

        state.init({
          interval: { from: new Date(2017, 0), to: new Date(2017, 1) },
          nextSelected: { '2017-01-01': true },
          dataAttribute: { '2017-01-01': { event: 'new year' } },
          selectType: 'INTERVAL',
        }, false);
        state.setSelected('2017-01-04', null, false);
        state.setInterval({ from: new Date(2017, 0), to: new Date(2018, 0), months: 3 }, false);
        state.setDataAttribute({ '2017-01-01': { event: 'new year' } }, false);

        removeFromAutoRun(counter);
        expect(count).to.be.equal(4);
      });
    });
  });
});

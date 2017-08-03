/* eslint-disable no-unused-expressions */
import React from 'react';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { mount } from 'enzyme';
import sinon from 'sinon';
import browserEnv from 'browser-env';
import Calendar from './Calendar/index';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('<Calendar />', () => {
  browserEnv();

  const onClick = sinon.spy();
  const classNames = { calendar: 'calendar', horizontal: 'horizontal', date: 'date', month: 'month' };
  const interval = { from: '2017-01-28', months: 3 };
  const defaultSelected = ['2017-01-01', '2017-01-02'];
  const dataAttribute = {
    '2017-01-28': { event: 'Mandy\'s Birthday' },
  };
  const calendar = mount(<Calendar
    monthFormat="YYYY年MM月"
    dateFormat="YYYY年MM月DD日"
    selectType="INTERVAL"
    onClick={onClick}
    classNames={classNames}
    interval={interval}
    defaultSelected={defaultSelected}
    dataAttribute={dataAttribute}
  />);

  it('当 interval 的区间为 3 时，渲染出三个月份组件', () => {
    expect(calendar.find(`.${classNames.calendar}`)).to.have.length(3);
  });

  it('传入的 defaultSelected 正确地被渲染出来', () => {
    expect(calendar.find('[data-selected]')).to.have.length(2);
    expect(calendar.find('[data-selected]').find('[data-date="2017-01-01"]')).to.have.length(1);
    expect(calendar.find('[data-selected]').find('[data-date="2017-01-02"]')).to.have.length(1);
  });

  it('onClick 传入值是否正确', () => (
    expect(new Promise((resolve) => {
      calendar.find('[data-date="2017-01-28"]').find('[data-which-month="CURRENT"]').simulate('click');
      expect(onClick.calledWith(sinon.match.hasOwn('state', Calendar.state))).to.be.true;
      expect(onClick.calledWith(sinon.match.hasOwn('date', '2017-01-28'))).to.be.true;
      expect(onClick.calledWith(sinon.match.hasOwn('nextSelected', ['2017-01-28']))).to.be.true;
      expect(onClick.calledWith(sinon.match.hasOwn('event', sinon.match.object))).to.be.true;
      setTimeout(() => {
        expect(calendar.find('[data-selected]').find('[data-which-month="CURRENT"]')).to.have.length(1);
        calendar.find('[data-date="2017-01-30"]').find('[data-which-month="CURRENT"]').simulate('click');
        expect(onClick.calledWith(sinon.match.hasOwn('state', Calendar.state))).to.be.true;
        expect(onClick.calledWith(sinon.match.hasOwn('date', '2017-01-30'))).to.be.true;
        expect(onClick.calledWith(sinon.match.hasOwn('nextSelected', ['2017-01-28', '2017-01-29', '2017-01-30']))).to.be.true;
        expect(onClick.calledWith(sinon.match.hasOwn('event', sinon.match.object))).to.be.true;
        setTimeout(() => {
          resolve(calendar.find('[data-selected]').find('[data-which-month="CURRENT"]'));
        }, 0);
      }, 0);
    })).to.eventually.have.length(3)
  ));

  it('componentWillReceiveProps 测试', () => (
    expect(new Promise((resolve) => {
      setTimeout(() => {
        calendar.setProps({ defaultSelected: ['2017-02-06'] });
        resolve(calendar.find('[data-selected]').find('[data-which-month="CURRENT"]'));
      }, 0);
    })).to.eventually.have.length(1)
  ));

  it('检验 data-* 是否正确渲染', () => {
    expect(
      calendar.find('[data-event="Mandy\'s Birthday"]').find('[data-which-month="CURRENT"]').find('[data-date="2017-01-28"]'),
    ).to.have.length(1);
  });

  it('检验 dateFormat 是否正确渲染', () => {
    expect(
      calendar.find(`.${classNames.date}`).first().text(),
    ).to.be.equal('2017年01月01日');
  });

  it('检验 monthFormat 是否正确渲染', () => {
    expect(
      calendar.find(`.${classNames.month}`).first().text(),
    ).to.be.equal('2017年01月');
  });

  it('检验 classNames 是否渲染正确', () => {
    expect(
      calendar.find(`.${classNames.calendar}`),
    ).to.have.length(3);

    expect(
      calendar.find(`.${classNames.calendar}`).first().find(`.${classNames.month}`),
    ).to.have.length(1);

    expect(
      calendar.find(`.${classNames.calendar}`).first().find(`.${classNames.horizontal}`),
    ).to.have.length(6);

    expect(
      calendar
        .find(`.${classNames.calendar}`).first()
        .find(`.${classNames.horizontal}`).first()
        .find(`.${classNames.date}`),
    ).to.have.length(7);

    expect(
      calendar
        .find(`.${classNames.calendar}`)
        .first()
        .find(`.${classNames.horizontal}`)
        .first()
        .find(`.${classNames.date}`)
        .first()
        .text(),
    ).to.be.equal('2017年01月01日');
  });

  it('enableTouchTap');
});

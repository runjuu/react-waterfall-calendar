import { expect } from 'chai';
import moment from 'moment';
import filterMonth from './';
import { calendarLength } from '../';

export default () => (
  describe('filterMonth', () => {
    const month = filterMonth();
    it(`filterMonth 方法返回一个按时间从早到晚排序的长度为 ${calendarLength} 的日期数组`, () => {
      expect(month)
        .to.be.an('array')
        .that.have.lengthOf(calendarLength)
        .that.has.all.match(/\d{4}-\d{2}-\d{2}/);
      month.forEach((date, index) => {
        expect(moment(date).diff(month[0], 'days')).to.be.equal(index);
      });
    });
    it(`数组中包含以周日为每周第一天的当月日期，以及前后扩展以凑够 ${calendarLength}天 的日期`, () => {
      expect(moment(month[0]).day()).to.be.equal(0);
      expect(moment(month[calendarLength - 1]).day()).to.be.equal(6);
    });
    it('支持传入不同月份的日期返回不同月份的数组', () => {
      const january = filterMonth('2017');
      const february = filterMonth('2017-02');
      const march = filterMonth('2017-03-01');
      expect(january[27]).to.be.equal('2017-01-28');
      expect(february[8]).to.be.equal('2017-02-06');
      expect(march[6]).to.be.equal('2017-03-04');
    });
  })
);

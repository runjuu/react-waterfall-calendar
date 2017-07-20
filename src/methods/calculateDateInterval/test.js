
import moment from 'moment';
import { expect } from 'chai';
import calculateDateInterval from './index';

export default () => (
  describe('calculateDateInterval', () => {
    it('传入开始日期和结束日期，返回从开始日期到结束日期之间的所有日期', () => {
      const dateInterval = calculateDateInterval('2017-01-28', '2017-02-06');
      expect(dateInterval[0]).to.be.equal('2017-01-28');
      dateInterval.forEach((date, index) => {
        expect(moment(date).diff('2017-01-28', 'days')).to.be.equal(index);
      });
    });
    it('当结束日期早于开始日期时，返回一个空数组', () => (
      expect(calculateDateInterval('2018-01-28', '2017-02-06')).to.be.empty
    ));
  })
);

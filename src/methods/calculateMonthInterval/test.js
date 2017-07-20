import { expect } from 'chai';
import moment from 'moment';
import calculateMonthInterval from './index';

export default () => (
  describe('calculateMonthInterval', () => {
    it('传入起始和结束日期，返回两个日期月份间的所有日期', () => {
      let count = 0;
      const [january, february] = calculateMonthInterval('2017-01-28', '2017-02-06');
      expect(january[0][0]).to.be.equal('2017-01-01');
      expect(january[3][6]).to.be.equal('2017-01-28');
      expect(february[1][1]).to.be.equal('2017-02-06');

      count = 0;
      february.forEach((date, index) => {
        [...new Array(7)].forEach((value, i) => {
          expect(moment(february[index][i]).diff(february[0][0], 'days')).to.be.equal(count);
          count += 1;
        });
      });
      expect(count).to.be.equal(42);
    });
  })
);

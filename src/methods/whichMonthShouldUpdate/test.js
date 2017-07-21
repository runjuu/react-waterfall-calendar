import { expect } from 'chai';
import whichMonthShouldUpdate from './index';

export default () => (
  describe('whichMonthShouldUpdate', () => {
    it('传入多次「包含日期名称」的对象，根据上一次的数据和新传入的数据返回变更涉及到的月份', () => {
      expect(whichMonthShouldUpdate({ '2017-01-28': true })).to.deep.equal({ '2017-01': true });
      expect(whichMonthShouldUpdate({ '2017-02-06': true, '2017-03-04': true })).to.deep.equal({ '2017-01': true, '2017-02': true, '2017-03': true });
      expect(whichMonthShouldUpdate({ '2017-02-16': true })).to.deep.equal({ '2017-02': true, '2017-03': true });
      expect(whichMonthShouldUpdate({ '2017-03-16': false })).to.deep.equal({ '2017-02': true, '2017-03': true });
      expect(whichMonthShouldUpdate({ '2017-03-16': false })).to.deep.equal({ '2017-03': true });
    });
  })
);

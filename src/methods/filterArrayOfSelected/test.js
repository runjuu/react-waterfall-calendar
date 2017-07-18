import { expect } from 'chai';
import filterArrayOfSelected from './';

export default () => (
  describe('filterArrayOfSelected', () => {
    it('传入一个日期数组，返回 key 格式为 YYYY-MM-DD, value 为 true 的对象', () => {
      const arrayOfSelected = ['2017-02-06', '2017-01-28'];
      expect(filterArrayOfSelected(arrayOfSelected)).to.deep.equal({
        '2017-02-06': true,
        '2017-01-28': true,
      });
    });
    it('当数组中的值非正常的日期格式时，返回的对象中忽略该值', () => {
      const arrayOfSelected = ['2017-01-28', 'should be ignored', '2017', NaN, undefined];
      expect(filterArrayOfSelected(arrayOfSelected)).to.deep.equal({
        '2017-01-01': true,
        '2017-01-28': true,
      });
    });
  })
);

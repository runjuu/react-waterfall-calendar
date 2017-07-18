import { expect } from 'chai';
import filterDataAttribute from './';

export default () => (
  describe('filterDataAttribute', () => {
    it('遍历传入的对象并转化为 YYYY-MM-DD 的对象名，然后再将该格式下的可遍历对象名改为 data-* 的命名方式', () => {
      const dataAttribute = {
        '2017-1-1': { event: 'New Year' },
        '2017-01-28': { people: 'mandy', event: 'birthday' },
      };
      const result = filterDataAttribute(dataAttribute);
      expect(result).to.deep.equal({
        '2017-01-01': { 'data-event': 'New Year' },
        '2017-01-28': { 'data-people': 'mandy', 'data-event': 'birthday' },
      });
    });
    it('传入的对象中可遍历对象的名称非标注日期格式时，只将二级对象名称改为 data-* 的命名方式', () => {
      const dataAttribute = {
        abc: { type: 'alphabet' },
      };
      const result = filterDataAttribute(dataAttribute);
      expect(result).to.deep.equal({
        abc: { 'data-type': 'alphabet' },
      });
    });
  })
);

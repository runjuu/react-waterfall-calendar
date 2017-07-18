import { expect } from 'chai';
import slice from './';

export default () => (
  describe('slice', () => {
    const month = [...new Array(14)].map((value, index) => (index + 1));
    const count = 7;
    const sliceResult = slice(month, count);
    it('长度为 14 的数组应当被切为两个长度为 7 的数组', () => {
      expect(sliceResult).to.have.lengthOf(2);
      expect(sliceResult[0]).to.have.lengthOf(7);
      expect(sliceResult[1]).to.have.lengthOf(7);
    });
    it('第一个数组的值为 [1, 2, 3, 4, 5, 6, 7]，第二个数组的值为 [8, 9, 10, 11, 12, 13, 14]', () => {
      expect(sliceResult[0]).to.deep.equal([1, 2, 3, 4, 5, 6, 7]);
      expect(sliceResult[1]).to.deep.equal([8, 9, 10, 11, 12, 13, 14]);
    });
  })
);

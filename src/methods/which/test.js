import { expect } from 'chai';
import which from './index';

export default () => (
  describe('which', () => {
    it('传入一个对象，current、target 两个日期进行对比, 值为 undefined 时使用当前的日期进行判断，返回对应的字符串 "FUTURE" "PAST" "CURRENT"', () => {
      expect(which({ current: '2017-01-28', target: '2017-02-06' })).to.be.equal('FUTURE');
      expect(which({ current: '2017-02-06', target: '2017-01-28' })).to.be.equal('PAST');
      expect(which({ current: '2017-07-21', target: '2017-07-21' })).to.be.equal('CURRENT');
      expect(which({ current: '2017-01-28' })).to.be.equal('FUTURE');
      expect(which({ target: '2097-02-06' })).to.be.equal('FUTURE');
    });
    it('传入 diff 后的数字，大于 0 时返回 "FUTURE" 小于 0 时返回 "PAST" 等于 0 时返回 "CURRENT"', () => {
      expect(which(1)).to.be.equal('FUTURE');
      expect(which(-1)).to.be.equal('PAST');
      expect(which(0)).to.be.equal('CURRENT');
    });
    it('传入不支持的值时，以及 current、target 不能正常解析为日期时，返回 null', () => {
      expect(which({ current: null })).to.be.equal(null);
      expect(which({ target: 'abc' })).to.be.equal(null);
      expect(which('a')).to.be.equal(null);
      expect(which('2017-01-28')).to.be.equal(null);
      expect(which('0')).to.be.equal(null);
      expect(which(false)).to.be.equal(null);
    });
  })
);

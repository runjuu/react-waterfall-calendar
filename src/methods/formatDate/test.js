import { expect } from 'chai';
import moment from 'moment';
import formatDate from './';

export default () => (
  describe('formatDate', () => {
    it('传入「new Date()」或者「undefined」都应当返回当前日期的 YYYY-MM-DD 格式', () => {
      expect(formatDate(new Date())).to.be.equal(moment(new Date()).format('YYYY-MM-DD'));
      expect(formatDate()).to.be.equal(moment(new Date()).format('YYYY-MM-DD'));
    });
    it('传入「new Date(2017, 0, 28)」应当返回 2017-01-28', () => {
      expect(formatDate(new Date(2017, 0, 28))).to.be.equal('2017-01-28');
    });
  })
);

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import FuncPool from './index';

chai.use(chaiAsPromised);
const expect = chai.expect;

export default () => (
  describe('FuncPool', () => {
    const funcPool = new FuncPool();

    let num = 0;
    const a = () => { num += 1; return 'a'; };
    const b = () => { num *= 2; return 'b'; };
    const c = () => { num = 10; return 'c'; };
    const d = () => { throw new Error('error'); };

    it('FuncPool 实例拥有三个属性，update、autoRun、removeFromAutoRun', () => {
      expect(funcPool).to.have.property('update').to.be.an('function');
      expect(funcPool).to.have.property('autoRun').to.be.an('function');
      expect(funcPool).to.have.property('removeFromAutoRun').to.be.an('function');
    });
    describe('autoRun', () => {
      it('调用 autoRun 时传入一个函数，会返回一个函数数组', () => {
        funcPool.clear();
        expect(funcPool.autoRun(a)).to.deep.equal([a]);
        expect(funcPool.autoRun(b)).to.deep.equal([a, b]);
        expect(funcPool.autoRun(c)).to.deep.equal([a, b, c]);
      });
      it('调用 autoRun 时传入一个函数数组，会将该函数数组合并入原有数组内', () => {
        funcPool.clear();
        expect(funcPool.autoRun([a, b, c])).to.deep.equal([a, b, c]);
      });
      it('传入一个非函数的类型会 throw 一个类型错误，传入 undefined 时则会返回当前 funcPool 的函数数组', () => {
        funcPool.clear();
        expect(funcPool.autoRun([a, b])).to.deep.equal([a, b]);
        expect(funcPool.autoRun.bind(funcPool, 'abc')).to.throw(TypeError);
        expect(funcPool.autoRun()).to.deep.equal([a, b]);
      });
      it('对该数组进行直接操作不会改变 update 的执行顺序', () => {
        funcPool.clear();
        expect(funcPool.autoRun([a, b])).to.deep.equal([a, b]);
        funcPool.autoRun().pop();
        expect(funcPool.autoRun()).to.deep.equal([a, b]);
      });
      it('重复传入相同函数不会多次调用该函数，而是会将该函数的调用位置后移', () => {
        funcPool.clear();
        expect(funcPool.autoRun([a, b, c])).to.deep.equal([a, b, c]);
        expect(funcPool.autoRun(a)).to.deep.equal([b, c, a]);
      });
    });
    describe('update', () => {
      it('调用 update 会按顺序执行 autoRun 传入的函数', () => {
        num = 0;
        funcPool.clear();
        funcPool.autoRun([a, b, c]);
        funcPool.update();
        expect(num).to.be.equal(10);
        funcPool.autoRun(b);
        funcPool.update();
        expect(num).to.be.equal(20);
      });
      it('调用 update 会返回一个 promise 对象，then 会返回一个所有函数调用结果的数组', () => {
        funcPool.clear();
        funcPool.autoRun([a, b, c]);
        return expect(funcPool.update()).to.eventually.deep.equal(['a', 'b', 'c']);
      });
      it('当调用时出现错误时，会将错误信息 reject', () => (
        expect(funcPool.autoRun(d) && funcPool.update()).to.eventually.rejectedWith(Error)
      ));
    });
    describe('clear', () => {
      it('调用 clear 会清除 autoRun 传入的所有方法', () => {
        funcPool.clear();
        expect(funcPool.autoRun()).to.deep.equal([]);
      });
    });
    describe('removeFromAutoRun', () => {
      it('调用 autoRun 时传入一个函数，会返回一个移除传入函数后的新函数数组', () => {
        funcPool.clear();
        funcPool.autoRun(a);
        expect(funcPool.autoRun(b)).to.deep.equal([a, b]);
        expect(funcPool.removeFromAutoRun(b)).to.deep.equal([a]);
      });
      it('传入一个非函数的类型会 throw 一个类型错误，传入 undefined 时则会返回当前 funcPool 的函数数组', () => {
        funcPool.clear();
        funcPool.autoRun(a);
        expect(funcPool.autoRun(b)).to.deep.equal([a, b]);
        expect(funcPool.removeFromAutoRun.bind(funcPool, 'abc')).to.throw(TypeError);
        expect(funcPool.removeFromAutoRun(a)).to.deep.equal([b]);
      });
      it('对该数组进行直接操作不会改变 update 的执行顺序', () => {
        funcPool.clear();
        funcPool.autoRun([a, b]);
        funcPool.removeFromAutoRun().pop();
        expect(funcPool.removeFromAutoRun()).to.deep.equal([a, b]);
      });
      it('再次调用 update 时将不会再运行该函数', () => {
        funcPool.clear();
        funcPool.autoRun([a, b]);
        expect(funcPool.removeFromAutoRun(b)).to.deep.equal([a]);
        num = 0;
        const result = funcPool.update();
        expect(num).to.be.equal(1);
        return expect(result).to.eventually.deep.equal(['a']);
      });
    });
  })
);

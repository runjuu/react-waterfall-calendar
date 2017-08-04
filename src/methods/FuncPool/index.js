class FuncPool {
  constructor() {
    this.update = this.update.bind(this);
    this.autoRun = this.autoRun.bind(this);
    this.removeFromAutoRun = this.removeFromAutoRun.bind(this);
  }

  updatePool = [];

  update() {
    this.updatePool.forEach(func => typeof func === 'function' && func());
  }

  autoRun(func) {
    if (!this.updatePool.includes(func)) this.updatePool.push(func);
  }

  removeFromAutoRun(func) {
    this.updatePool.splice(this.updatePool.findIndex(oldFunc => oldFunc === func), 1);
  }
}

export default FuncPool;

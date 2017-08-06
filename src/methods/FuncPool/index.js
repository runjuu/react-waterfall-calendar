function checkType(func) {
  if (func === undefined || typeof func === 'function' || Array.isArray(func)) return func;
  throw new TypeError('FuncPool accept a function as a parameter');
}

function FuncPool() {
  let updatePool = [];

  function update() {
    const result = [];
    try {
      updatePool.forEach(func => typeof func === 'function' && result.push(func()));
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  function removeFromAutoRun(func) {
    checkType(func);
    const index = updatePool.findIndex(oldFunc => oldFunc === func);
    if (index > -1) updatePool.splice(index, 1);
    return updatePool.slice(0);
  }

  function autoRun(func) {
    if (updatePool.includes(func)) {
      removeFromAutoRun(func);
      updatePool.push(func);
    } else if (checkType(func)) {
      if (Array.isArray(func)) {
        func.forEach(funcInArray => autoRun(funcInArray));
      } else {
        updatePool.push(func);
      }
    }
    return updatePool.slice(0);
  }

  this.update = update.bind(this);
  this.autoRun = autoRun.bind(this);
  this.removeFromAutoRun = removeFromAutoRun.bind(this);
  this.clear = () => { updatePool = []; };
}

export default FuncPool;

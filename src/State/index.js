import FuncPool from 'func-pool';
import State from './State';

function initialize(target) {
  const state = new State();
  const { update, autoRun, removeFromAutoRun } = new FuncPool();

  state.update = update;

  if (typeof target === 'function') {
    Object.defineProperty(target, 'state', { value: state });
    Object.defineProperty(target, 'autoRun', { value: autoRun });
    Object.defineProperty(target, 'removeFromAutoRun', { value: removeFromAutoRun });
  }

  return typeof target === 'function' ? target : { state, autoRun, removeFromAutoRun };
}

export default initialize;

import { createStore } from 'redux';
import reducers from './reducers/';
import component from './component/';
import actions from './actions';

const store = createStore(reducers);
const action = actions(store);
export default {
  store,
  ...action,
  ...component,
};

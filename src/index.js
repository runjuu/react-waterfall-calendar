import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/';
import component from './component/';
import actions from './actions';


const store = createStore(reducers, composeWithDevTools(
  applyMiddleware()
));
const action = actions(store);
export default {
  store,
  ...action,
  ...component,
};

global.store = store;

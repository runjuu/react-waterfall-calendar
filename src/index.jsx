import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import Calendar from './Calendar/';
import { initCalendar } from './Calendar/CalendarActions';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware));

store.dispatch(initCalendar());

const ReactModuleCalendar = ({
  event,
  textColor,
}) => (
  <Provider store={store}>
    <Calendar
      event={event}
      textColor={textColor}
    />
  </Provider>
);

ReactModuleCalendar.propTypes = {
  event: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
  })),
  textColor: PropTypes.string,
};


export default ReactModuleCalendar;

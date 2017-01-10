import React, { PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import Calendar from './Calendar/';
import MultipleCalendar from './MultipleCalendar/';
import { initCalendar } from './Calendar/CalendarActions';
import { initMultipleCalendar } from './MultipleCalendar/MultipleCalendarActions';

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware));

const ReactModuleCalendar = ({
  multiple,
  event,
}) => {
  if (multiple) {
    const { from, to } = multiple;
    store.dispatch(initMultipleCalendar({ from, to }));
    return (
      <Provider store={store}>
        <MultipleCalendar
          multiple={multiple}
          event={event}
        />
      </Provider>
    );
  }
  store.dispatch(initCalendar());
  return (
    <Provider store={store}>
      <Calendar
        event={event}
      />
    </Provider>
  );
};

ReactModuleCalendar.propTypes = {
  event: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
  })),
  multiple: PropTypes.shape({
    from: PropTypes.date,
    to: PropTypes.date,
  }),
};


export default ReactModuleCalendar;

import React, { Component, PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import MultipleCalendar from './MultipleCalendar/';
import { initDateEvents } from './Calendar/CalendarActions';
import { initMultipleCalendar } from './MultipleCalendar/MultipleCalendarActions';

const middleware = [thunk]; if (process.env.NODE_ENV !== 'production') middleware.push(createLogger());
const store = createStore(reducer, applyMiddleware(...middleware));

class WaterfallCalendar extends Component {
  static setMonthDiff({ from, to }) {
    store.dispatch(initMultipleCalendar({ from, to }));
  }
  static setEvents(events) {
    store.dispatch(initDateEvents(events));
  }
  componentWillMount() {
    store.dispatch(initMultipleCalendar(this.props.multiple));
  }
  render() {
    return (
      <Provider store={store}>
        <MultipleCalendar {...this.props} />
      </Provider>
    );
  }
}

WaterfallCalendar.propTypes = {
  multiple: PropTypes.shape({
    from: PropTypes.date,
    to: PropTypes.date,
  }),
};

WaterfallCalendar.defaultProps = {
  multiple: {
    from: new Date(),
    to: new Date(),
  },
};

export default WaterfallCalendar;

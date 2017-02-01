import React, { Component, PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import MultipleCalendar from './MultipleCalendar/';
import { setDateEvents } from './Calendar/CalendarActions';
import { setMultipleCalendar, updateMultipleCalendar, resetMultipleCalendar } from './MultipleCalendar/MultipleCalendarActions';

const middleware = [thunk]; if (process.env.NODE_ENV !== 'production') middleware.push(createLogger());
const store = createStore(reducer, applyMiddleware(...middleware));
class WaterfallCalendar extends Component {
  static setMonthDiff({ from, to }) {
    store.dispatch(setMultipleCalendar({ from, to }));
  }
  static setEvents(events) {
    store.dispatch(setDateEvents(events));
  }
  static update() {
    store.dispatch(updateMultipleCalendar());
  }
  static reset() {
    store.dispatch(resetMultipleCalendar());
  }
  componentWillMount() {
    store.dispatch(setMultipleCalendar(this.props.interval));
  }
  render() {
    return (
      <Provider store={store}>
        <MultipleCalendar {...this.props} />
      </Provider>
    );
  }
}
window.test = WaterfallCalendar.update;
window.testt = WaterfallCalendar.reset;

WaterfallCalendar.propTypes = {
  interval: PropTypes.shape({
    from: PropTypes.date,
    to: PropTypes.date,
  }),
};

WaterfallCalendar.defaultProps = {
  interval: {},
};

export default WaterfallCalendar;

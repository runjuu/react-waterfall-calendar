import React, { Component, PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers';
import Calendar from './Calendar/';
import MultipleCalendar from './MultipleCalendar/';
import { initCalendar, initDateEvents } from './Calendar/CalendarActions';
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
    const { multiple } = this.props;
    if (multiple) {
      store.dispatch(initMultipleCalendar(multiple));
    } else store.dispatch(initCalendar());
  }
  render() {
    const { multiple, ...props } = this.props;
    return (
      <Provider store={store}>
        {multiple ? (
          <MultipleCalendar multiple={multiple} {...props} />
        ) : (
          <Calendar multiple={multiple} {...props} />
        )}
      </Provider>
    );
  }
}

WaterfallCalendar.propTypes = {
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
  classNameOf: PropTypes.shape({
    root: PropTypes.string,
    calendar: PropTypes.string,
    title: PropTypes.string,
    week: PropTypes.string,
    day: PropTypes.string,
  }),
  defaultStyle: PropTypes.objectOf(PropTypes.string).isRequired,
};

WaterfallCalendar.defaultProps = {
  event: [],
  classNameOf: {},
  multiple: undefined,
};

export default WaterfallCalendar;

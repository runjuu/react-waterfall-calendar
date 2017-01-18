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
  // event: PropTypes.arrayOf(PropTypes.shape({
  //   date: PropTypes.string,
  //   className: PropTypes.string,
  //   onClick: PropTypes.func,
  //   dataAttr: PropTypes.object,
  // })),
  multiple: PropTypes.shape({
    from: PropTypes.date,
    to: PropTypes.date,
  }),
  // classNameOf: PropTypes.shape({
  //   root: PropTypes.string,
  //   calendar: PropTypes.string,
  //   title: PropTypes.string,
  //   week: PropTypes.string,
  //   day: PropTypes.string,
  // }),
  // defaultStyle: PropTypes.objectOf(PropTypes.string).isRequired,
};

WaterfallCalendar.defaultProps = {
  event: [],
  classNameOf: {},
  multiple: {
    from: new Date(),
    to: new Date(),
  },
};

export default WaterfallCalendar;

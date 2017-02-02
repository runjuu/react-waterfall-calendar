import React, { Component, PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import MultipleCalendar from './MultipleCalendar/';
import { setDateEvents, setSelected } from './Calendar/CalendarActions';
import { setMultipleCalendar, updateMultipleCalendar, resetMultipleCalendar } from './MultipleCalendar/MultipleCalendarActions';
import { filterDate } from './methods';

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

class WaterfallCalendar extends Component {

  static setMonthDiff({ from, to }) {
    store.dispatch(setMultipleCalendar({ from, to }));
  }

  static setEvents(events) {
    store.dispatch(setDateEvents(events));
  }

  static update() {
    return new Promise((resolve) => {
      resolve(store.dispatch(updateMultipleCalendar()));
    });
  }

  static reset() {
    store.dispatch(resetMultipleCalendar());
  }

  componentWillMount() {
    const { multipleSelect } = this.props;
    const { year, month, day } = filterDate();
    const date = `${year}-${month + 1}-${day}`;
    store.dispatch(setMultipleCalendar(this.props.interval));
    store.dispatch(setSelected({ date, multipleSelect }));
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
  interval: PropTypes.shape({
    from: PropTypes.date,
    to: PropTypes.date,
  }),
  multipleSelect: PropTypes.bool,
};

WaterfallCalendar.defaultProps = {
  interval: {},
  multipleSelect: false,
};

export default WaterfallCalendar;

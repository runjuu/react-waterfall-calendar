import React, { Component, PropTypes } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import MultipleCalendar from './MultipleCalendar/';
import { setDataAttr, setSelected } from './Calendar/CalendarActions';
import { setMultipleCalendar, updateMultipleCalendar, resetMultipleCalendar } from './MultipleCalendar/MultipleCalendarActions';
import { filterDate } from './methods';

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

class WaterfallCalendar extends Component {

  static setMonthDiff({ from, to, firstWeekDay }) {
    store.dispatch(setMultipleCalendar({ from, to, firstWeekDay }));
  }

  static setDataAttr(events) {
    store.dispatch(setDataAttr(events));
  }

  static setSelected({ date, multipleSelect }) {
    store.dispatch(setSelected({ date, multipleSelect }));
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
    const { multipleSelect, interval, firstWeekDay, dataAttr } = this.props;
    const { year, month, day } = filterDate();
    const date = `${year}-${month + 1}-${day}`;

    WaterfallCalendar.setMonthDiff({ ...interval, firstWeekDay });
    WaterfallCalendar.setSelected({ date, multipleSelect });
    WaterfallCalendar.setDataAttr(dataAttr);

    window.store = store;
    if (firstWeekDay > 6) console.error(`firstWeekDay must less than 6, but input is ${firstWeekDay}`);
    if (firstWeekDay < 0) console.error(`firstWeekDay must greater than 0, but input is ${firstWeekDay}`);
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
  firstWeekDay: PropTypes.number,
  dataAttr: PropTypes.objectOf(PropTypes.shape({
    attr: PropTypes.object,
  })),
};

WaterfallCalendar.defaultProps = {
  interval: {},
  dataAttr: {},
  multipleSelect: false,
  firstWeekDay: 0,
};

export default WaterfallCalendar;

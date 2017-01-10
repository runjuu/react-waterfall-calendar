import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Calendar from '../Calendar/';
import style from './style.sass';
import { filterEvents } from '../methods';

class MultipleCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: filterEvents(this.props.events),
    };
  }
  render() {
    const { multipleSelect, listOfCalendar, classNameOf } = this.props;
    return (
      <div className={classNames(style.root, classNameOf.root)}>
        {listOfCalendar.map(month => (
          <Calendar
            {...month.calendar}
            key={month.monthWithYear}
            event={this.state.events}
            multipleSelect={multipleSelect}
            classNameOf={classNameOf}
          />
        ))}
      </div>
    );
  }
}

MultipleCalendar.propTypes = {
  listOfCalendar: PropTypes.arrayOf(PropTypes.shape({
    monthWithYear: PropTypes.string,
    calendar: PropTypes.shape({
      calendarArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string.isRequired,
        weekDay: PropTypes.number.isRequired,
      }))),
      month: PropTypes.number,
      year: PropTypes.number,
    }),
  })),
  events: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
  })),
  multipleSelect: PropTypes.bool,
  classNameOf: PropTypes.shape({
    root: PropTypes.string,
  }),
};

export default connect(state => ({
  ...state.multipleCalendar,
}))(MultipleCalendar);

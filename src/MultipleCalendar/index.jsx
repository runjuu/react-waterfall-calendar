import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Calendar from '../Calendar/';

class MultipleCalendar extends Component {
  render() {
    const { listOfCalendar, classNameOf, style, ...props } = this.props;
    return (
      <div className={classNames(style.root, classNameOf.root)}>
        {listOfCalendar.map(month => (
          <Calendar
            {...month.calendar}
            {...props}
            style={style}
            key={month.monthWithYear}
            classNameOf={classNameOf}
          />
        ))}
      </div>
    );
  }
}

MultipleCalendar.propTypes = {
  style: PropTypes.objectOf(PropTypes.string),
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

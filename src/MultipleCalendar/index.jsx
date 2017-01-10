import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Calendar from '../Calendar/';
import { filterEvents } from '../methods';

class MultipleCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: filterEvents(this.props.events),
    };
  }
  render() {
    const { multipleSelect, listOfCalendar } = this.props;
    console.log(listOfCalendar);
    return (
      <div>
        {listOfCalendar.map(month => (
          <Calendar
            {...month.calendar}
            key={month.monthWithYear}
            event={this.state.events}
            multipleSelect={multipleSelect}
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
};

export default connect(state => ({
  ...state.multipleCalendar,
}))(MultipleCalendar);

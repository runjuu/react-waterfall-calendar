import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';

@observer
class Calendar extends Component {
  render() {
    return (
      <div>
        {this.props.calendar.map(month => (
          <div key={month[0][0]}>
            {month.map(horizontal => (
              <div key={horizontal[0]}>
                {horizontal.map(date => (
                  <span key={date}>{date}</span>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  calendar: PropTypes.observableArrayOf(
    PropTypes.observableArrayOf(
      PropTypes.objectOrObservableObject)),
};

Calendar.defaultProps = {
  calendar: [],
};

export default Calendar;

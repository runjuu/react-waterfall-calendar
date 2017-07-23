import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { autoUpdate } from '../../state';
import Month from '../Month';

class Calendar extends Component {

  static propTypes = {
    classNames: PropTypes.objectOf(PropTypes.string),
    onClick: PropTypes.func,
    dateFormat: PropTypes.string,
    monthFormat: PropTypes.string,
    enableTouchTap: PropTypes.bool,
  };

  static defaultProps = {
    onClick: undefined,
    enableTouchTap: false,
    classNames: {},
    dateFormat: 'D',
    monthFormat: 'YYYY-MM',
  };

  @autoUpdate
  render(calendar) {
    const {
      onClick, classNames, dateFormat, monthFormat, enableTouchTap,
    } = this.props;
    return (
      <div className={classNames.calendars}>
        {calendar.map(month => (
          <Month
            key={month[0][0]}
            month={month}
            currentMonth={moment(month[1][0]).date(1)}
            onClick={onClick}
            classNames={classNames}
            dateFormat={dateFormat}
            monthFormat={monthFormat}
            enableTouchTap={enableTouchTap}
          />
        ))}
      </div>
    );
  }
}

export default Calendar;

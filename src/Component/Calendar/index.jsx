import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import moment from 'moment';
import { calendarState } from '../../';
import Month from '../Month';

const Calendar = (
  { onClick, classNames, dateFormat, monthFormat, enableTouchTap, updateMonth },
) => (
  <div className={classNames.calendars}>
    {calendarState.calendar.map(month => (
      <Month
        key={month[0][0]}
        month={month}
        currentMonth={moment(month[1][0]).date(1)}
        onClick={onClick}
        classNames={classNames}
        dateFormat={dateFormat}
        monthFormat={monthFormat}
        enableTouchTap={enableTouchTap}
        updateMonth={updateMonth}
      />
    ))}
  </div>
);

Calendar.propTypes = {
  classNames: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func,
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  enableTouchTap: PropTypes.bool,
  updateMonth: PropTypes.objectOf(PropTypes.bool).isRequired,
};

Calendar.defaultProps = {
  onClick: undefined,
  enableTouchTap: false,
  classNames: {},
  dateFormat: 'D',
  monthFormat: 'YYYY-MM',
};

export default observer(Calendar);

import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Month from './Month';
import { calendarState } from './';

const Calendar = ({ onClick, classNames, dateFormat, monthFormat, enableTouchTap }) => (
  <div className={classNames.calendars}>
    {calendarState.calendar.map(month => (
      <Month
        key={month[0][0]}
        month={month}
        onClick={onClick}
        classNames={classNames}
        dateFormat={dateFormat}
        monthFormat={monthFormat}
        enableTouchTap={enableTouchTap}
      />
    ))}
  </div>
);

Calendar.propTypes = {
  classNames: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func,
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  enableTouchTap: React.PropTypes.bool,
};

Calendar.defaultProps = {
  onClick: undefined,
  enableTouchTap: false,
  classNames: {},
  dateFormat: 'D',
  monthFormat: 'YYYY-MM',
};

export default observer(Calendar);

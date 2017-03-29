import React, { PropTypes } from 'react';
import { observer } from 'mobx-react';
import Month from './Month';
import classes from './jss';
import { calendarState } from './';

const Calendar = ({ onClick, classNames }) => (
  <div className={`${classes.calendar} ${classNames.calendar}`}>
    {calendarState.calendar.map(month => (
      <Month
        key={month[0][0]}
        month={month}
        onClick={onClick}
        classNames={classNames}
      />
    ))}
  </div>
);

Calendar.propTypes = {
  classNames: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func,
};

Calendar.defaultProps = {
  onClick: undefined,
  classNames: {},
};

export default observer(Calendar);

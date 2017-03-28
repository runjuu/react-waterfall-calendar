import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss';
import Month from './Month';
import { calendarState } from './';

const styles = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

@injectSheet(styles)
@observer
class Calendar extends Component {

  render() {
    const { classes = {}, onClick, classNames } = this.props;
    const { calendar } = calendarState;

    return (
      <div className={`${classes.calendar} ${classNames.calendar}`}>
        {calendar.map(month => (
          <Month
            key={month[0][0]}
            month={month}
            onClick={onClick}
            classNames={classNames}
          />
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  classNames: PropTypes.objectOf(PropTypes.string),
  onClick: PropTypes.func,
};

Calendar.defaultProps = {
  classes: undefined,
  onClick: undefined,
  classNames: {},
};

export default Calendar;

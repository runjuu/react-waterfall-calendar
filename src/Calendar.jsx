import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import injectSheet from 'react-jss';
import Month from './Month';
import { calendarState } from './';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

@injectSheet(styles)
@observer
class Calendar extends Component {

  render() {
    const { classes = {}, onClick } = this.props;
    const { calendar } = calendarState;

    return (
      <div className={classes.root}>
        {calendar.map(month => (
          <Month
            key={month[0][0]}
            month={month}
            onClick={onClick}
          />
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  onClick: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string),
};

Calendar.defaultProps = {
  onClick: undefined,
  classes: undefined,
};

export default Calendar;

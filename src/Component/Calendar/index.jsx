import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Month from '../Month';
import initCalendar from '../../State/';

@initCalendar
class Calendar extends Component {

  static propTypes = {
    classNames: PropTypes.objectOf(PropTypes.string),
    onClick: PropTypes.func,
    dateFormat: PropTypes.string,
    monthFormat: PropTypes.string,
    enableTouchTap: PropTypes.bool,
    defaultSelected: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    onClick: null,
    enableTouchTap: false,
    classNames: {},
    dateFormat: 'D',
    monthFormat: 'YYYY-MM',
    defaultSelected: null,
  };

  constructor(props) {
    super(props);

    Calendar.state.init({ ...this.props, nextSelected: this.props.defaultSelected });
    Calendar.autoRun(this.forceUpdate.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    Calendar.state.init({ ...nextProps, nextSelected: nextProps.defaultSelected }, false);
  }

  render() {
    return (
      <div className={this.props.classNames.calendars}>
        {Calendar.state.calendar.map(month => (
          <Month
            key={month[0][0]}
            month={month}
            currentMonth={moment(month[1][0]).date(1)}
            onClick={this.props.onClick}
            classNames={this.props.classNames}
            dateFormat={this.props.dateFormat}
            monthFormat={this.props.monthFormat}
            enableTouchTap={this.props.enableTouchTap}
          />
        ))}
      </div>
    );
  }
}

export default Calendar;

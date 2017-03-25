import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import injectSheet from 'react-jss';
import moment from 'moment';
import { which } from './methods';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  month: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  horizontal: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
};

@observer
@injectSheet(styles)
class Calendar extends Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const date = event.target.getAttribute('href').slice(1);
    console.log(date);
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.props.calendar.map((month) => {
          const currentMonth = moment(month[1][0]).date(1);
          return (

            <div key={month[0][0]} className={classes.month}>
              <h2>{currentMonth.format('YYYY-MM')}</h2>
              {month.map(horizontal => (

                <div key={horizontal[0]} className={classes.horizontal}>
                  {horizontal.map((date) => {
                    const currentDate = moment(date);

                    return (

                      <a
                        key={date}
                        href={`#${date}`}
                        onClick={this.handleClick}
                        data-which-month={which(moment(currentDate).date(1).diff(currentMonth, 'month'))}
                        data-which-day={which(currentDate.diff(moment().format('YYYY-MM-DD'), 'day'))}
                      >
                        {moment(date).format('DD')}
                      </a>

                    );
                  })}
                </div>

              ))}
            </div>

          );
        })}
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

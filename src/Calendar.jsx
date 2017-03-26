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

@injectSheet(styles)
@observer
class Calendar extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { state } = this.props;
    const date = event.target.getAttribute('href').slice(1);
    state.setSelected(date);
  }

  render() {
    const { classes, state } = this.props;
    const { calendar, selected } = state;

    return (
      <div className={classes.root}>
        {calendar.map((month) => {
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
                        data-selected={selected[date]}
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
  state: React.PropTypes.shape({
    calendar: PropTypes.observableArrayOf(
      PropTypes.observableArrayOf(
        PropTypes.objectOrObservableObject)),
  }).isRequired,
};

export default Calendar;

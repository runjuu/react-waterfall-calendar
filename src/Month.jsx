import React, { Component } from 'react';
import { toJS } from 'mobx';
import { PropTypes } from 'mobx-react';
import moment from 'moment';
import classes from './jss';
import { which, filterSelected, filterArrayOfSelected } from './methods';
import { calendarState } from './';

class Month extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate({ updateMonth, currentMonth }) {
    return !!updateMonth[currentMonth.format('YYYY-MM')];
  }

  handleClick(event) {
    event.preventDefault();
    const { onClick } = this.props;
    const date = event.target.getAttribute('data-date');

    const nextSelected = Object.keys(
      filterSelected(date, calendarState.selected, calendarState.selectType));

    if (typeof onClick === 'function') {
      Promise.all([onClick({ state: toJS(calendarState), event, date, nextSelected })])
      .then(([params]) => {
        if (typeof params !== 'object') {
          if (params !== false) calendarState.setSelected(date);
          return;
        }

        if (params.nextSelected) {
          calendarState.setSelected(undefined, filterArrayOfSelected(params.nextSelected));
        }
      });
    } else {
      calendarState.setSelected(date);
    }
  }

  render() {
    const {
      month, currentMonth,
      classNames,
      monthFormat, dateFormat,
      enableTouchTap,
    } = this.props;
    const onClick = { [enableTouchTap ? 'onTouchTap' : 'onClick']: this.handleClick };
    return (
      <div className={`${classes.calendar} ${classNames.calendar || ''}`}>
        <h2 className={`${classes.month} ${classNames.month || ''}`}>{currentMonth.format(monthFormat)}</h2>
        {month.map(horizontal => (

          <div
            key={horizontal[0]}
            className={`${classes.horizontal} ${classNames.horizontal || ''}`}
          >
            {horizontal.map((date) => {
              const currentDate = moment(date);
              const preDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
              const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
              const dataAttribute = calendarState.dataAttribute[date] || {};
              const isSelected = calendarState.selected[date];
              return (

                <p
                  key={date}
                  className={`${classes.date} ${classNames.date || ''}`}
                  data-date={date}
                  data-first-selected={(!calendarState.selected[preDate] && isSelected) ? '' : undefined}
                  data-last-selected={(!calendarState.selected[nextDate] && isSelected) ? '' : undefined}
                  data-selected={isSelected ? '' : undefined}
                  data-which-month={which(moment(currentDate).date(1).diff(currentMonth, 'month'))}
                  data-which-day={which(currentDate.diff(moment().format('YYYY-MM-DD'), 'day'))}
                  {...onClick}
                  {...dataAttribute}
                >
                  <span>{moment(date).format(dateFormat)}</span>
                </p>

              );
            })}
          </div>

        ))}
      </div>
    );
  }
}

Month.propTypes = {
  onClick: React.PropTypes.func,
  month: PropTypes.observableArrayOf(
    PropTypes.objectOrObservableObject.isRequired,
  ),
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
  dateFormat: React.PropTypes.string.isRequired,
  monthFormat: React.PropTypes.string.isRequired,
  enableTouchTap: React.PropTypes.bool.isRequired,
  updateMonth: React.PropTypes.objectOf(React.PropTypes.bool).isRequired,
  currentMonth: React.PropTypes.shape({
    format: React.PropTypes.func.isRequired,
  }).isRequired,
};

Month.defaultProps = {
  onClick: undefined,
  classNames: {},
  month: [],
};

export default Month;

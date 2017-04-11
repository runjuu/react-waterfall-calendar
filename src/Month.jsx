import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer, PropTypes } from 'mobx-react';
import moment from 'moment';
import classes from './jss';
import { which, filterSelected, filterArrayOfSelected } from './methods';
import { calendarState } from './';

@observer
class Month extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { onClick } = this.props;
    const date = event.target.getAttribute('href').slice(1);

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
        if (params.dataAttribute) {
          calendarState.setDataAttribute(params.dataAttribute);
        }
      });
    } else {
      calendarState.setSelected(date);
    }
  }

  render() {
    const {
      month, classNames,
      monthFormat, dateFormat,
    } = this.props;
    const currentMonth = moment(month[1][0]).date(1);
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

                <a
                  key={date}
                  href={`#${date}`}
                  onClick={this.handleClick}
                  className={`${classes.date} ${classNames.date || ''}`}
                  data-first-selected={(!calendarState.selected[preDate] && isSelected) ? '' : undefined}
                  data-last-selected={(!calendarState.selected[nextDate] && isSelected) ? '' : undefined}
                  data-selected={isSelected ? '' : undefined}
                  data-which-month={which(moment(currentDate).date(1).diff(currentMonth, 'month'))}
                  data-which-day={which(currentDate.diff(moment().format('YYYY-MM-DD'), 'day'))}
                  {...dataAttribute}
                >
                  {moment(date).format(dateFormat)}
                </a>

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
};

Month.defaultProps = {
  onClick: undefined,
  classNames: {},
  month: [],
};

export default Month;

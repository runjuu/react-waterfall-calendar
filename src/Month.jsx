import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer, PropTypes } from 'mobx-react';
import moment from 'moment';
import classes from './jss';
import { which, filterSelected } from './methods';
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
      .then(([params = {}]) => {
        if (params && params.nextSelected) {
          const paramsNextSelected = {};
          if (params.nextSelected instanceof Array) {
            params.nextSelected.forEach((dateString) => {
              if (dateString) paramsNextSelected[moment(dateString).format('YYYY-MM-DD')] = true;
            });
          }
          calendarState.setSelected(undefined, paramsNextSelected);
        } else if (params !== false) {
          calendarState.setSelected(date);
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
    console.log(monthFormat, dateFormat);
    return (
      <div className={`${classes.month} ${classNames.month || ''}`}>
        <h2>{currentMonth.format(monthFormat)}</h2>
        {month.map(horizontal => (

          <div key={horizontal[0]} className={`${classes.horizontal} ${classNames.horizontal || ''}`}>
            {horizontal.map((date) => {
              const currentDate = moment(date);
              const dataAttribute = calendarState.dataAttribute[date] || {};
              return (

                <a
                  key={date}
                  href={`#${date}`}
                  onClick={this.handleClick}
                  className={classNames.date}
                  data-selected={calendarState.selected[date] ? '' : undefined}
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

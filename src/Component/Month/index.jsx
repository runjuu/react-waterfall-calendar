import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import style from '../style';
import { which, filterSelected, filterArrayOfSelected } from '../../methods/';
import Calendar from '../Calendar/';

class Month extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    month: PropTypes.arrayOf(PropTypes.array),
    classNames: PropTypes.objectOf(PropTypes.string),
    dateFormat: PropTypes.string.isRequired,
    monthFormat: PropTypes.string.isRequired,
    enableTouchTap: PropTypes.bool.isRequired,
    currentMonth: PropTypes.shape({
      format: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    onClick: undefined,
    classNames: {},
    month: [],
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  shouldComponentUpdate({ currentMonth }) {
    return !!Calendar.state.updateMonth[currentMonth.format('YYYY-MM')];
  }

  handleClick(event) {
    event.preventDefault();
    const { onClick } = this.props;
    const date = event.target.getAttribute('data-date');

    const nextSelected = Object.keys(
      filterSelected(date, Calendar.state.selected, Calendar.state.selectType));

    if (typeof onClick === 'function') {
      Promise.all([onClick({ state: Calendar.state, event, date, nextSelected })])
        .then(([params]) => {
          if (typeof params !== 'object') {
            if (params !== false) Calendar.state.setSelected(date);
            return;
          }

          if (params.nextSelected) {
            Calendar.state.setSelected(undefined, filterArrayOfSelected(params.nextSelected));
          }
        });
    } else {
      Calendar.state.setSelected(date);
    }
  }

  render() {
    const {
      month,
      currentMonth,
      classNames,
      monthFormat, dateFormat,
      enableTouchTap,
    } = this.props;
    const onClick = { [enableTouchTap ? 'onTouchTap' : 'onClick']: this.handleClick };
    return (
      <div className={`${style.calendar} ${classNames.calendar || ''}`}>
        <h2 className={`${style.month} ${classNames.month || ''}`}>{currentMonth.format(monthFormat)}</h2>
        {month.map(horizontal => (

          <div
            key={horizontal[0]}
            className={`${style.horizontal} ${classNames.horizontal || ''}`}
          >
            {horizontal.map((date) => {
              const currentDate = moment(date);
              const preDate = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
              const nextDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
              const dataAttribute = Calendar.state.dataAttribute[date] || {};
              const isSelected = Calendar.state.selected[date];
              return (

                <p
                  key={date}
                  className={`${style.date} ${classNames.date || ''}`}
                  data-date={date}
                  data-first-selected={(!Calendar.state.selected[preDate] && isSelected) ? '' : undefined}
                  data-last-selected={(!Calendar.state.selected[nextDate] && isSelected) ? '' : undefined}
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

export default Month;

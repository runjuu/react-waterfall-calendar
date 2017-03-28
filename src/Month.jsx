import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer, PropTypes } from 'mobx-react';
import injectSheet from 'react-jss';
import moment from 'moment';
import { which } from './methods';
import { calendarState } from './';

const styles = {
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
class Month extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const { onClick } = this.props;
    const date = event.target.getAttribute('href').slice(1);

    calendarState.setSelected(date);
    if (typeof onClick === 'function') onClick({ state: toJS(calendarState), event, date });
  }

  render() {
    const { month, classes = {}, classNames } = this.props;
    const currentMonth = moment(month[1][0]).date(1);
    return (
      <div className={`${classes.month} ${classNames.month}`}>
        <h2>{currentMonth.format('YYYY-MM')}</h2>
        {month.map(horizontal => (

          <div key={horizontal[0]} className={`${classes.horizontal} ${classNames.horizontal}`}>
            {horizontal.map((date) => {
              const currentDate = moment(date);

              return (

                <a
                  key={date}
                  href={`#${date}`}
                  onClick={this.handleClick}
                  className={classNames.date}
                  data-selected={calendarState.selected[date] ? '' : undefined}
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
  }
}

Month.propTypes = {
  onClick: React.PropTypes.func,
  month: PropTypes.observableArrayOf(
    PropTypes.objectOrObservableObject.isRequired,
  ),
  classNames: React.PropTypes.objectOf(React.PropTypes.string),
};

Month.defaultProps = {
  onClick: undefined,
  classNames: {},
  month: [],
};

export default Month;

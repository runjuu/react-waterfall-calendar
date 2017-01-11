import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './style.sass';
import { setSelected } from './CalendarActions';
import { filterDate, whichMonth, whichDay, isToday, filterEvents } from '../methods';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.state = {
      events: this.props.event ? this.props.event : filterEvents(this.props.events),
      selected: {},
    };
  }
  handleClickEvent(e) {
    e.preventDefault();
    const { target, type } = e;
    const { events } = this.state;
    const { multipleSelect, dispatch, enableTouchTap } = this.props;
    const date = target.getAttribute('data-date');

    if ((enableTouchTap && type === 'click') || (!enableTouchTap && type !== 'click')) return;

    dispatch(setSelected({ date, multipleSelect }));
    if (events[date] && typeof events[date].onClick === 'function') {
      events[date].onClick({
        date,
        target,
      });
    }
  }
  render() {
    const {
      month, year,
      enableTouchTap,
      defaultSelectedToday,
      classNameOf, selected, calendarArray,
    } = this.props;
    const onClick = {};

    if (enableTouchTap) {
      onClick.onTouchTap = this.handleClickEvent;
    } else {
      onClick.onClick = this.handleClickEvent;
    }
    return (
      <div className={classNames(style.root, classNameOf.calendar)}>
        <h3
          data-year={year}
          data-month={month + 1}
          className={classNameOf.title}
        >
          <span>{`${year}-${month + 1}`}</span>
        </h3>
        {calendarArray.map((horizontal, index) => (
          <section
            key={index}
            className={classNames(style.horizontal, classNameOf.week)}
          >
            {horizontal.map((vertical) => {
              const date = filterDate(vertical.date);
              const data = {};
              data['data-day'] = date.day;
              data['data-date'] = vertical.date;
              data['data-weekDay'] = vertical.weekDay;
              data['data-which-month'] = whichMonth({ date: vertical.date, refer: `${year}-${month + 1}` });
              data['data-which-day'] = whichDay(vertical.date);
              data['data-is-today'] = isToday(vertical.date) || undefined;
              data['data-selected'] = (defaultSelectedToday && Object.getOwnPropertyNames(selected).length === 0 && isToday(vertical.date)) || selected[vertical.date];
              return (
                <a
                  {...data}
                  {...onClick}
                  key={vertical.date}
                  href={`#${vertical.date}`}
                  className={classNames(style.vertical, classNameOf.day)}
                >
                  <span>
                    {date.day}
                  </span>
                </a>
              );
            })}
          </section>
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
  })),
  event: PropTypes.objectOf(PropTypes.shape({
    date: PropTypes.string,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
  })),
  calendarArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    weekDay: PropTypes.number.isRequired,
  }))),
  classNameOf: PropTypes.shape({
    calendar: PropTypes.string,
    title: PropTypes.string,
    week: PropTypes.string,
    day: PropTypes.string,
  }),
  dispatch: PropTypes.func,
  selected: PropTypes.objectOf(PropTypes.bool),
  defaultSelectedToday: PropTypes.bool,
  enableTouchTap: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  month: PropTypes.number,
  year: PropTypes.number,
};

export default connect(state => ({
  ...state.calendar,
  selected: state.selected,
}))(Calendar);

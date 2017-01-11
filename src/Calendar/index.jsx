import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './style.sass';
import { setSelected } from './CalendarActions';
import { filterDate, whichMonth, isToday, filterEvents } from '../methods';

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

    const { target } = e;
    const { events } = this.state;
    const { multipleSelect, dispatch } = this.props;
    const date = target.getAttribute('data-date');

    dispatch(setSelected({ date, multipleSelect }));
    if (events[date] && typeof events[date].onClick === 'function') {
      events[date].onClick({
        date,
        target,
      });
    }
  }
  render() {
    const { calendarArray, month, year, classNameOf, selected } = this.props;
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
              data['data-is-today'] = isToday(vertical.date) || undefined;
              data['data-selected'] = selected[vertical.date];
              return (
                <a
                  {...data}
                  key={vertical.date}
                  href={`#${vertical.date}`}
                  className={classNames(style.vertical, classNameOf.day)}
                  onClick={this.handleClickEvent}
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
  multipleSelect: PropTypes.bool,
  month: PropTypes.number,
  year: PropTypes.number,
};

export default connect(state => ({
  ...state.calendar,
  selected: state.selected,
}))(Calendar);

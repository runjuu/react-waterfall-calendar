import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import style from './style.sass';
import { filterDate, whichMonth, isToday, filterEvents } from '../methods';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.setSelected = this.setSelected.bind(this);
    this.state = {
      events: this.props.event ? this.props.event : filterEvents(this.props.events),
      selected: {},
    };
  }
  setSelected(date) {
    // selected change should had a middleware
    const selected = {};
    selected[date] = !this.state.selected[date];
    if (this.props.multipleSelect) {
      this.setState({
        selected: Object.assign({}, this.state.selected, selected),
      });
    } else {
      this.setState({
        selected,
      });
    }
  }
  handleClickEvent(e) {
    e.preventDefault();

    const { target } = e;
    const { events } = this.state;
    const date = target.getAttribute('data-date');

    this.setSelected(date);
    if (events[date] && typeof events[date].onClick === 'function') {
      events[date].onClick({
        date,
        target,
      });
    }
  }
  render() {
    const { calendarArray, month, year, classNameOf } = this.props;
    const { selected } = this.state;
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
  multipleSelect: PropTypes.bool,
  month: PropTypes.number,
  year: PropTypes.number,
};

export default connect(state => ({
  ...state.calendar,
}))(Calendar);

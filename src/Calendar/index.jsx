import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
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
    const { calendarArray, month, year } = this.props;
    const { selected } = this.state;
    return (
      <div>
        <h3
          data-year={year}
          data-month={month}
        >
          <span>{`${year}-${month}`}</span>
        </h3>
        {calendarArray.map((horizontal, index) => (
          <section
            key={index}
            className={style.horizontal}
          >
            {horizontal.map((vertical) => {
              const date = filterDate(vertical.date);
              return (
                <a
                  key={vertical.date}
                  href={`#${vertical.date}`}
                  className={style.vertical}
                  onClick={this.handleClickEvent}
                  data-date={vertical.date}
                  data-selected={selected[vertical.date]}
                  data-is-today={isToday(vertical.date) || undefined}
                  data-which-month={whichMonth({ date: vertical.date, refer: `${year}-${month + 1}` })}
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
  event: PropTypes.object,
  calendarArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    weekDay: PropTypes.number.isRequired,
  }))),
  multipleSelect: PropTypes.bool,
  month: PropTypes.number,
  year: PropTypes.number,
};

export default connect(state => ({
  ...state.calendar,
}))(Calendar);

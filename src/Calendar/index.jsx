import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { setSelected } from './CalendarActions';
import { shouldUpdateSelected } from './CalendarMethods';
import { filterDate, whichMonth, whichDay, isToday, filterDataAttr, newDate } from '../methods';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.handleClickEvent = this.handleClickEvent.bind(this);
    this.state = {
      selected: {},
    };
  }

  shouldComponentUpdate(nextProps) {
    const { year, month } = this.props;
    return shouldUpdateSelected({
      current: this.props.selected,
      next: nextProps.selected,
      date: newDate(`${year}-${month + 1}`),
    });
  }

  handleClickEvent(e) {
    e.preventDefault();
    const { target, type } = e;
    const { multipleSelect, dispatch, enableTouchTap, onClick } = this.props;
    const date = target.getAttribute('data-date');

    if ((enableTouchTap && type === 'click') || (!enableTouchTap && type !== 'click')) return;

    dispatch(setSelected({ date, multipleSelect }));
    if (typeof onClick === 'function') {
      onClick({ date, target });
    }
  }

  render() {
    const onClick = {};
    const {
      defaultStyle,
      month, year,
      enableTouchTap,
      customizeStyle, selected, calendarArray, dateEvents,
    } = this.props;

    if (enableTouchTap) {
      onClick.onTouchTap = this.handleClickEvent;
    } else {
      onClick.onClick = this.handleClickEvent;
    }
    return (
      <div className={classNames(defaultStyle.root, customizeStyle.calendar)}>
        <h3
          data-year={year}
          data-month={month + 1}
          className={classNames(defaultStyle.title, customizeStyle.title)}
        >
          <span
            data-year={year}
            data-month={month + 1}
          />
        </h3>
        {calendarArray.map((horizontal, index) => (
          <section
            key={index}
            className={classNames(defaultStyle.horizontal, customizeStyle.week)}
          >
            {horizontal.map((vertical) => {
              const date = filterDate(vertical.date);
              const dateEvent = dateEvents[vertical.date];
              const data = dateEvent ? filterDataAttr(dateEvent.dataAttr) : {};
              data['data-day'] = date.day;
              data['data-date'] = vertical.date;
              data['data-weekDay'] = vertical.weekDay;
              data['data-which-month'] = whichMonth({ date: vertical.date, refer: `${year}-${month + 1}` });
              data['data-which-day'] = whichDay(vertical.date);
              data['data-is-today'] = isToday(vertical.date) || undefined;
              data['data-selected'] = selected[vertical.date];
              return (
                <a
                  {...data}
                  {...onClick}
                  key={vertical.date}
                  href={`#${vertical.date}`}
                  className={classNames(defaultStyle.vertical, customizeStyle.day)}
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

Calendar.defaultProps = {
  defaultStyle: {},
  dateEvents: {},
  calendarArray: [],
  customizeStyle: {},
  selected: {},
  onClick: () => {},
  enableTouchTap: false,
  multipleSelect: false,
};

Calendar.propTypes = {
  dateEvents: PropTypes.objectOf(PropTypes.shape({
    date: PropTypes.string,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
  })),
  calendarArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    weekDay: PropTypes.number.isRequired,
  }))),
  defaultStyle: PropTypes.objectOf(PropTypes.string),
  customizeStyle: PropTypes.shape({
    calendar: PropTypes.string,
    title: PropTypes.string,
    week: PropTypes.string,
    day: PropTypes.string,
  }),
  dispatch: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.objectOf(PropTypes.bool),
  enableTouchTap: PropTypes.bool,
  multipleSelect: PropTypes.bool,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};

export default connect(state => ({
  ...state.calendar,
  selected: state.selected,
  dateEvents: state.dateEvents,
}))(Calendar);

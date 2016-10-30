import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { getDateTable, setSelectType, onClickDate } from '../../actions';

class DateTable extends Component {
  constructor() {
    super();
    this.typeClassName = this.typeClassName.bind(this);
    this.onClickDate = this.onClickDate.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getDateTable(this.props.date, this.props.config));
    this.props.dispatch(setSelectType(this.props.selectType || 'single'));
  }
  onClickDate(e) {
    const date = e.target.parentNode.getAttribute('data-date');
    this.props.dispatch(onClickDate(date, this.props.clickCallback));
  }
  typeClassName(type, date, customize) {
    const className = [];
    switch (type) {
      case 'lastMonth':
        className.push(this.props.otherMonthClassName);
        break;
      case 'nextMonth':
        className.push(this.props.otherMonthClassName);
        break;
      case 'currentMonth':
        break;
      default:
        break;
    }
    if (this.props.events.totalTimes === 0 && date === moment().format('YYYY-MM-DD')) {
      className.push(this.props.otherMonthClassName);
    } else if (this.props.events.isSelected[date]) {
      className.push(this.props.otherMonthClassName);
    }
    if (customize[date]) className.push(customize[date].classname);
    return classNames(...className);
  }
  render() {
    return (
      <div className={this.props.classname}>
        <section className={this.props.weekClassName}>
          {this.props.dateTable.weekTitle.map((title, t) => (
            <div key={t}>
              {title}
            </div>
          ))}
        </section>
        {this.props.dateTable.table.map((column, c) => (
          <section key={c}>
            {column.map((row, r) => (
              <div
                data-column={c}
                data-row={r}
                data-date={row.date}
                data-customize={this.props.customize[row.date] && this.props.customize[row.date].data}
                key={row.date}
                className={this.typeClassName(row.type, row.date, this.props.customize)}
              >
                <a
                  onClick={this.onClickDate}
                  href={`#${row.date}`}
                >
                  {row.day}
                </a>
              </div>
            ))}
          </section>
        ))}
      </div>
    );
  }
}

DateTable.propTypes = {
  dateTable: PropTypes.shape({
    table: PropTypes.array,
    weekTitle: PropTypes.array,
  }),
  date: PropTypes.string,
  events: PropTypes.shape({
    isSelected: PropTypes.objectOf(PropTypes.bool),
    totalTimes: PropTypes.number,
  }),
  clickCallback: PropTypes.func,
  dispatch: PropTypes.func,
  classname: PropTypes.string,
  weekClassName: PropTypes.string,
  otherMonthClassName: PropTypes.string,
  selectType: PropTypes.string,
  config: PropTypes.shape({
    firstDayOfTheWeek: PropTypes.number,
    weekNamed: PropTypes.objectOf(PropTypes.string),
  }),
  customize: PropTypes.objectOf(PropTypes.shape({
    data: PropTypes.string,
    classname: PropTypes.string,
  })),
};

export default DateTable;

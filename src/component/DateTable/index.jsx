import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { getDateTable, setSelectType, onClickDate } from '../../actions';

class DateTable extends Component {
  constructor() {
    super();
    this.typeClassName = this.typeClassName.bind(this);
    this.onClickDate = this.onClickDate.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getDateTable(this.props.date));
    this.props.dispatch(setSelectType(this.props.selectType || 'single'));
  }
  onClickDate(e) {
    const date = e.target.parentNode.getAttribute('data-date');
    this.props.dispatch(onClickDate(date, this.props.clickCallback));
  }
  typeClassName(type, date) {
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
    if (this.props.events.isSelected[date]) className.push(this.props.otherMonthClassName);
    return classNames(...className);
  }
  render() {
    return (
      <div className={this.props.classname}>
        {this.props.dateTable.map((column, c) => (
          <section key={c}>
            {column.map((row, r) => (
              <div
                data-column={c}
                data-row={r}
                data-date={row.date}
                key={row.date}
                className={this.typeClassName(row.type, row.date)}
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
  dateTable: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string,
        day: PropTypes.string,
      }))
  ),
  date: PropTypes.string,
  events: PropTypes.shape({
    isSelected: PropTypes.objectOf(PropTypes.bool),
  }),
  onClickDate: PropTypes.func,
  clickCallback: PropTypes.func,
  dispatch: PropTypes.func,
  classname: PropTypes.string,
  otherMonthClassName: PropTypes.string,
  selectType: PropTypes.string,
};

export default DateTable;

import React, { Component, PropTypes } from 'react';
import { getDateTable } from '../../actions';

class DateTable extends Component {
  componentDidMount() {
    this.props.dispatch(getDateTable(this.props.date));
  }
  render() {
    return (
      <div className={this.props.classname}>
        {this.props.dateTable.map((column, c) => (
          <section key={c}>
            {column.map((row, r) => (
              <div data-column={c} data-row={r} key={row.date}>
                <a onClick={this.props.onClick} href={`#${row.date}`}>{row.day}</a>
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
        selected: PropTypes.bool,
        date: PropTypes.string,
        day: PropTypes.string,
      }))
  ),
  date: PropTypes.string,
  onClick: PropTypes.func,
  dispatch: PropTypes.func,
  classname: PropTypes.string,
};

export default DateTable;

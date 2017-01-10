import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './style.sass';
import { filterDate, whichMonth } from '../methods';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // console.log(this.state);
  }
  render() {
    const { calendarArray, month, year } = this.props;
    return (
      <div>
        {calendarArray.map((horizontal, index) => (
          <section
            key={index}
            className={style.horizontal}
          >
            {horizontal.map((vertical) => {
              const date = filterDate(vertical.date);
              return (
                <div
                  key={vertical.date}
                  className={style.vertical}
                  data-which-month={whichMonth({ date: vertical.date, refer: `${year}-${month + 1}` })}
                >
                  <a>
                    {date.day}
                  </a>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  event: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    dataAttr: PropTypes.object,
  })),
  calendarArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    weekDay: PropTypes.number.isRequired,
  }))),
};

export default connect(state => ({
  ...state.calendar,
}))(Calendar);

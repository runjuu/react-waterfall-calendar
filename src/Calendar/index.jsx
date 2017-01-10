import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './style.sass';
import { dateFilter } from '../methods';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // console.log(this.state);
  }
  render() {
    const { calendarArray, textColor } = this.props;
    return (
      <div>
        {calendarArray.map((horizontal, index) => (
          <section
            key={index}
            className={style.horizontal}
          >
            {horizontal.map((vertical) => {
              const date = dateFilter(vertical.date);
              return (
                <div
                  key={vertical.date}
                  className={style.vertical}
                >
                  <a
                    data-color={textColor}
                  >
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
  textColor: PropTypes.string,
  calendarArray: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    weekDay: PropTypes.number.isRequired,
  }))),
};

export default connect(state => ({
  ...state.calendar,
}))(Calendar);

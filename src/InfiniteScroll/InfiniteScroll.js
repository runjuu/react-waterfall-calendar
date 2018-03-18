import React, { Component } from 'react';
import './InfiniteScroll.css';
import Calendar from 'react-waterfall-calendar';
import _ from 'lodash';

const monthStep = 48;

class InfiniteScroll extends Component {

  constructor(props) {
    super(props);

    this.state = {
      interval: { months: monthStep },
    };
  }

  componentDidMount() {
    document.addEventListener('scroll', _.throttle(
      this.handlePageScroll.bind(this),
      100
    ));
  }

  makeMoreInterval() {
    this.setState({
      interval: {
        months: this.state.interval.months + monthStep
      },
    });
  }

  handlePageScroll() {
    const offset = window.innerHeight * 3;
    if ((offset + window.scrollY) >= document.body.offsetHeight) {
      this.makeMoreInterval();
    }
  }

  render() {
    return (
      <div>
        <ul className="week-bar">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <Calendar
          {...this.state}
          selectType="INTERVAL"
          monthFormat="YYYY/MM"
          classNames={{
            calendar: 'calendar',
            date: 'date',
            month: 'month',
          }}
        />
      </div>
    );
  }
}

export default InfiniteScroll;

import React, { Component } from 'react';
import './InfiniteScroll.css';
import Calendar from 'react-waterfall-calendar';
import State from './State';

class InfiniteScroll extends Component {

  constructor(props) {
    super(props);

    this.state = new State(this);
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
          <li>Fir</li>
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

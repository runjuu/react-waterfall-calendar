import React, { Component } from 'react';
import Calendar from '../../src/';
import CalendarStyle from '../../style.css';
import style from './style.sass';

let canUpdate = true;

class Demo extends Component {

  static handleScroll() {
    if (canUpdate && (window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 0.8)) {
      canUpdate = false;
      window.requestAnimationFrame(() => {
        Calendar.update().then(() => { canUpdate = true; });
      });
    }
  }

  static handleClick(event) {
    const { target } = event;
    const date = target.getAttribute('data-date');
    console.log(date);
  }

  componentDidMount() {
    window.addEventListener('scroll', Demo.handleScroll);
  }

  render() {
    return (
      <div>
        <Calendar
          defaultStyle={CalendarStyle}
          customizeStyle={style}
          onClick={Demo.handleClick}
          firstWeekDay={7}
        />
      </div>
    );
  }

}

export default Demo;

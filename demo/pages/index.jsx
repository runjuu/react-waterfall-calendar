import React, { Component } from 'react';
import Calendar from '../../src/';
import CalendarStyle from '../../style.css';
import style from './style.sass';

class Demo extends Component {
  static handleScroll() {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight * 0.8)) {
      window.requestAnimationFrame(Calendar.update);
    }
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
        />
      </div>
    );
  }
}

export default Demo;

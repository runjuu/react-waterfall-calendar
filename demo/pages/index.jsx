import React, { Component } from 'react';
import Calendar from '../../src/';
import CalendarStyle from '../../style.css';
import style from './style.sass';

let canUpdate = true;
const dataAttr = (() => ({
  [`${new Date()}`]: {
    customize: 'test',
  },
}))();

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
    return new Promise((resolve) => {
      resolve({ date: ['2017-02-13', '2017-02-14', '2017-02-15', '2017-02-16', '2017-02-17'] });
    });
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
          dataAttr={dataAttr}
          onClick={Demo.handleClick}
          firstWeekDay={0}
        />
      </div>
    );
  }

}

export default Demo;

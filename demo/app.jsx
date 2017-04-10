import { render } from 'react-dom';
import React, { Component } from 'react';
import style from './style.sass';
import Calendar from '../build/';

class Demo extends Component {

  static handleClick(params) {
    console.log(params);
  }

  constructor(props) {
    super(props);
    this.state = {
      interval: { months: 3 },
    };
  }

  render() {
    const { interval } = this.state;
    return (
      <Calendar
        dateFormat="D"
        monthFormat="YYYY-MM"
        selectType="INTERVAL"
        onClick={Demo.handleClick}
        classNames={style}
        interval={interval}
        dataAttribute={{
          '2017-04-01': {
            test: 'test',
          },
        }}
      />
    );
  }
}

Demo.propTypes = {

};

render(<Demo />, document.getElementById('container'));

import { render } from 'react-dom';
import React, { Component } from 'react';
import style from './style.sass';
import Calendar from '../src/';

class Demo extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(props) {
    console.log(Object.keys(props.state.selected));
  }

  render() {
    return (
      <Calendar
        selectType="INTERVAL"
        onClick={this.handleClick}
        classNames={style}
        interval={{ from: '2017-03', to: '2017-04' }}
      />
    );
  }
}

Demo.propTypes = {

};

render(<Demo />, document.getElementById('container'));

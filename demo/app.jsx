import { render } from 'react-dom';
import React, { Component } from 'react';
import style from './style.sass';
import Calendar from '../src/';

class Demo extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      interval: { from: '2017-03', to: '2017-04' },
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        interval: { from: '2017-03', to: '2017-12' },
      });
    }, 5000);
  }

  handleClick(params) {
    console.log(params);
  }

  render() {
    const { interval } = this.state;
    console.log(interval);
    return (
      <Calendar
        selectType="INTERVAL"
        onClick={this.handleClick}
        classNames={style}
        interval={interval}
      />
    );
  }
}

Demo.propTypes = {

};

render(<Demo />, document.getElementById('container'));

import { render } from 'react-dom';
import React, { Component } from 'react';
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
        interval={{ from: '2017-03', to: '2017-04' }}
        onClick={this.handleClick}
        selectType="INTERVAL"
      />
    );
  }
}

Demo.propTypes = {

};

render(<Demo />, document.getElementById('container'));

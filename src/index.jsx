import React, { Component } from 'react';
import State from './state';
import Calendar from './Calendar';

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = new State(props);
  }

  render() {
    return (
      <Calendar state={this.state} />
    );
  }
}

export default Wrapper;

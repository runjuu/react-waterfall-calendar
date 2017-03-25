import React, { Component } from 'react';
import State from './state';
import Calendar from './Calendar';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    const { calendar, selected } = new State(props);
    this.state = {
      calendar,
      selected,
    };
  }

  render() {
    return (
      <Calendar {...this.state} />
    );
  }
}

export default Wrapper;

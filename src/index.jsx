import React, { Component } from 'react';
import State from './state';
import Calendar from './Calendar';

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.state = new State(props);
  }

  render() {
    const { onClick } = this.props;
    return (
      <Calendar
        state={this.state}
        onClick={onClick}
      />
    );
  }
}

export default Wrapper;

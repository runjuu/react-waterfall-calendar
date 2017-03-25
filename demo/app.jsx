import { render } from 'react-dom';
import React, { Component } from 'react';
import Calendar from '../src/';

class Demo extends Component {
  render() {
    return (
      <Calendar
        interval={{ from: '2017-03', to: '2017-04' }}
      />
    );
  }
}

Demo.propTypes = {

};

render(<Demo />, document.getElementById('container'));

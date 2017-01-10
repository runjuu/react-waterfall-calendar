import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Calendar from '../Calendar/';

class MultipleCalendar extends Component {
  render() {
    return (
      <div>
        <Calendar />
      </div>
    );
  }
}

MultipleCalendar.propTypes = {

};

export default connect(state => ({
  ...state.multipleCalendar,
}))(MultipleCalendar);

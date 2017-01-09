import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initCalendar } from './CalendarActions';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    // console.log(this.state);
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

Calendar.propTypes = {

};

export default connect(state => ({
  ...state.calendar,
}))(Calendar);

import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import State from './state';
import Calendar from './Calendar';

export const calendarState = new State();

@observer
class Wrapper extends Component {
  constructor(props) {
    super(props);

    calendarState.init(props);
    this.state = calendarState;
  }

  render() {
    const { onClick } = this.props;
    return (
      <Calendar
        onClick={onClick}
      />
    );
  }
}

Wrapper.propTypes = {
  onClick: PropTypes.func,
};

Wrapper.defaultProps = {
  onClick: undefined,
};

export default Wrapper;

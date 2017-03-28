import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import State from './state';
import Calendar from './Calendar';

export const calendarState = new State();

@observer
class Wrapper extends Component {

  static propTypes = {
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: undefined,
  }

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

export default Wrapper;

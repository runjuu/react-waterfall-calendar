import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import State from './state';
import Calendar from './Calendar';

export const calendarState = new State();

@observer
class Wrapper extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    classNames: PropTypes.objectOf(PropTypes.string),
  }

  static defaultProps = {
    onClick: undefined,
    classNames: {},
  }

  constructor(props) {
    super(props);

    calendarState.init(props);
    this.state = calendarState;
  }

  componentDidUpdate() {
    calendarState.init(this.props);
  }

  render() {
    const { onClick, classNames } = this.props;
    return (
      <Calendar
        onClick={onClick}
        classNames={classNames}
      />
    );
  }
}

export default Wrapper;

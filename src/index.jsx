import React, { Component, PropTypes } from 'react';
import { observer } from 'mobx-react';
import State from './state';
import Calendar from './Calendar';
import { filterArrayOfSelected } from './methods';

export const calendarState = new State();

@observer
class Wrapper extends Component {

  static propTypes = {
    defaultSelected: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    defaultSelected: [],
  }

  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
    this.init();
  }

  componentWillReceiveProps() {
    this.init();
  }

  init() {
    const nextSelected = filterArrayOfSelected(this.props.defaultSelected);
    calendarState.init({ ...this.props, nextSelected });
  }

  render() {
    return (
      <Calendar {...this.props} updateMonth={calendarState.updateMonth} />
    );
  }
}

export default Wrapper;

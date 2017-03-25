import { observable } from 'mobx';
import moment from 'moment';
import { filterInterval } from './methods';

class State {
  @observable calendar = []
  @observable selected = {}

  constructor({ interval }) {
    this.setInterval(interval);
  }

  setInterval({ from, to, firstWeekDay } = {}) {
    this.calendar = filterInterval(moment(from), moment(to), firstWeekDay);
  }

}

export default State;

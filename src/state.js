import { observable } from 'mobx';
import moment from 'moment';
import { filterInterval, filterSelected } from './methods';

class State {
  @observable calendar = []
  @observable selected = {}
  @observable selectType = 'SINGLE'

  constructor({ interval }) {
    this.setInterval(interval);
  }

  setInterval({ from, to, firstWeekDay } = {}) {
    this.calendar = filterInterval(moment(from), moment(to), firstWeekDay);
  }

  setSelected(date) {
    this.selected = filterSelected(date, this.selected, this.selectType);
  }

}

export default State;

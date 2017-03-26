import { observable } from 'mobx';
import moment from 'moment';
import { calculateMonthInterval, filterSelected } from './methods';

class State {
  @observable calendar = []
  @observable selected = {}
  @observable selectType = 'SINGLE'

  constructor({ interval, selectType }) {
    this.setInterval(interval);
    this.selectType = selectType || this.selectType;
  }

  setInterval({ from, to, firstWeekDay } = {}) {
    this.calendar = calculateMonthInterval(moment(from), moment(to), firstWeekDay);
  }

  setSelected(date) {
    this.selected = filterSelected(date, this.selected, this.selectType);
  }

}

export default State;

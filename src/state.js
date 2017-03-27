import { observable, action } from 'mobx';
import moment from 'moment';
import { calculateMonthInterval, filterSelected, shouldMonthComponentUpdate } from './methods';

class State {
  @observable calendar = []
  @observable selected = {}
  @observable selectType = 'SINGLE'

  @action
  init({ interval, selectType }) {
    this.setInterval(interval);
    this.selectType = selectType || this.selectType;
  }

  @action
  setInterval({ from, to, firstWeekDay } = {}) {
    this.calendar = calculateMonthInterval(moment(from), moment(to), firstWeekDay);
  }

  @action
  setSelected(date) {
    this.selected = filterSelected(date, this.selected, this.selectType);
    shouldMonthComponentUpdate(undefined, this.selected);
  }

}

export default State;

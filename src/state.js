import { observable, action } from 'mobx';
import moment from 'moment';
import { calculateMonthInterval, filterSelected, shouldMonthComponentUpdate, filterDataAttribute } from './methods';

class State {
  @observable calendar = []
  @observable selected = {}
  @observable dataAttribute = {}
  @observable selectType = 'SINGLE'

  @action
  init({ interval, selectType, dataAttribute }) {
    this.setInterval(interval);
    this.setDataAttribute(dataAttribute);
    this.selectType = selectType || this.selectType;
  }

  @action
  setInterval({ from, to, months, firstWeekDay } = {}) {
    this.calendar = calculateMonthInterval(
      moment(from),
      months ? moment(from).add(months, 'months') : moment(to),
      firstWeekDay,
    );
  }

  @action
  setSelected(date, nextSelected) {
    this.selected = nextSelected || filterSelected(date, this.selected, this.selectType);
    shouldMonthComponentUpdate(undefined, this.selected);
  }

  @action
  setDataAttribute(dataAttribute) {
    this.dataAttribute = filterDataAttribute(dataAttribute);
  }

}

export default State;

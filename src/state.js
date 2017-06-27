import { observable, action } from 'mobx';
import moment from 'moment';
import { calculateMonthInterval, filterSelected, filterDataAttribute, whichMonthShouldUpdate } from './methods';

class State {
  @observable calendar = [];
  @observable selected = {};
  @observable dataAttribute = {};
  @observable updateMonth = {};
  @observable selectType = 'SINGLE';

  @action
  init({ interval, selectType, dataAttribute, nextSelected }) {
    if (interval) this.setInterval(interval);
    if (dataAttribute) this.setDataAttribute(dataAttribute);
    if (nextSelected) this.setSelected(undefined, nextSelected);
    this.selectType = selectType || this.selectType;
  }

  @action
  setInterval({ from, to, months, firstWeekDay } = {}) {
    this.calendar = calculateMonthInterval(
      moment(from),
      months ? moment(from).date(1).add(months > 0 ? months - 1 : 0, 'months') : moment(to),
      firstWeekDay,
    );
  }

  @action
  setSelected(date, nextSelected) {
    this.selected = nextSelected || filterSelected(date, this.selected, this.selectType);
    this.updateMonth = whichMonthShouldUpdate(this.selected);
  }

  @action
  setDataAttribute(dataAttribute) {
    this.dataAttribute = filterDataAttribute(dataAttribute);
  }

}

export default State;

import moment from 'moment';
import calculateMonthInterval from '../methods/calculateMonthInterval/';
import filterSelected from '../methods/filterSelected/';
import filterDataAttribute from '../methods/filterDataAttribute/';
import whichMonthShouldUpdate from '../methods/whichMonthShouldUpdate/';
import filterArrayOfSelected from '../methods/filterArrayOfSelected/';
import newError from '../methods/newError/';

const whichMonthShouldBeingUpdated = whichMonthShouldUpdate();

class State {

  constructor() {
    this.calendar = [];
    this.selected = {};
    this.dataAttribute = {};
    this.updateMonth = {};
    this.selectType = 'SINGLE';
    this.update = null;
  }

  reRender() {
    if (typeof this.update === 'function') this.update();
  }

  init({ interval, selectType, dataAttribute, nextSelected }, reRender) {
    if (interval) this.setInterval(interval, false);
    if (dataAttribute) this.setDataAttribute(dataAttribute, false);
    if (nextSelected) this.setSelected(undefined, nextSelected, false);
    this.selectType = selectType || this.selectType;

    if (reRender !== false) this.reRender();
  }

  setInterval({ from, to, months, month, firstWeekDay } = {}, reRender) {
    if (month) newError('interval props need "months" instead of "month"');

    this.calendar = calculateMonthInterval(
      moment(from),
      months ? moment(from).date(1).add(months > 0 ? months - 1 : 0, 'months') : moment(to),
      firstWeekDay,
    );

    if (reRender !== false) this.reRender();
  }

  setSelected(date, nextSelected, reRender) {
    if (Array.isArray(nextSelected)) {
      this.selected = filterArrayOfSelected(nextSelected);
    } else if (nextSelected && typeof nextSelected === 'object') {
      this.selected = nextSelected;
    } else {
      this.selected = filterSelected(date, this.selected, this.selectType);
    }

    this.updateMonth = whichMonthShouldBeingUpdated(this.selected);
    if (reRender !== false) this.reRender();
  }

  setDataAttribute(dataAttribute, reRender) {
    this.dataAttribute = filterDataAttribute(dataAttribute);
    if (reRender !== false) this.reRender();
  }

}

export default State;

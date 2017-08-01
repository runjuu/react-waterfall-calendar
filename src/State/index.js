import moment from 'moment';
import calculateMonthInterval from '../methods/calculateMonthInterval/';
import filterSelected from '../methods/filterSelected/';
import filterDataAttribute from '../methods/filterDataAttribute/';
import whichMonthShouldUpdate from '../methods/whichMonthShouldUpdate/';
import filterArrayOfSelected from '../methods/filterArrayOfSelected/';

const whichMonthreRender = whichMonthShouldUpdate();

class State {

  calendar = [];

  selected = {};

  dataAttribute = {};

  updateMonth = {};

  selectType = 'SINGLE';

  update = null;

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

  setInterval({ from, to, months, firstWeekDay } = {}, reRender) {
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

    this.updateMonth = whichMonthreRender(this.selected);
    if (reRender !== false) this.reRender();
  }

  setDataAttribute(dataAttribute, reRender) {
    this.dataAttribute = filterDataAttribute(dataAttribute);
    if (reRender !== false) this.reRender();
  }

}

function initialize(target) {
  const state = new State();
  const needUpdates = [];

  function update() {
    needUpdates.forEach(func => typeof func === 'function' && func());
  }
  function autoRun(func) {
    if (!needUpdates.includes(func)) needUpdates.push(func);
  }
  function removeFromAutoRun(removeFunc) {
    needUpdates.splice(needUpdates.findIndex(func => func === removeFunc), 1);
  }

  if (typeof target === 'function') {
    Object.defineProperty(target, 'state', { value: state });
    Object.defineProperty(target, 'autoRun', { value: autoRun });
    Object.defineProperty(target, 'removeFromAutoRun', { value: removeFromAutoRun });
  }

  state.update = update;
  return typeof target === 'function' ? target : {
    state,
    autoRun,
    removeFromAutoRun,
  };
}

export default initialize;

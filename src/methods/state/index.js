import moment from 'moment';
import calculateMonthInterval from '../calculateMonthInterval/';
import filterSelected from '../filterSelected/';
import filterDataAttribute from '../filterDataAttribute/';
import whichMonthShouldUpdate from '../whichMonthShouldUpdate/';
import filterArrayOfSelected from '../filterArrayOfSelected/';

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

  init({ interval, selectType, dataAttribute, nextSelected }) {
    if (interval) this.setInterval(interval, true);
    if (dataAttribute) this.setDataAttribute(dataAttribute, true);
    if (nextSelected) this.setSelected(undefined, nextSelected, true);
    this.selectType = selectType || this.selectType;
  }

  setInterval({ from, to, months, firstWeekDay } = {}, shouldNotUpdate) {
    this.calendar = calculateMonthInterval(
      moment(from),
      months ? moment(from).date(1).add(months > 0 ? months - 1 : 0, 'months') : moment(to),
      firstWeekDay,
    );
    if (!shouldNotUpdate) this.reRender();
  }

  setSelected(date, nextSelected, shouldNotUpdate) {
    this.selected = nextSelected || filterSelected(date, this.selected, this.selectType);
    this.updateMonth = whichMonthShouldUpdate(this.selected);
    if (!shouldNotUpdate) this.reRender();
  }

  setDataAttribute(dataAttribute, shouldNotUpdate) {
    this.dataAttribute = filterDataAttribute(dataAttribute);
    if (!shouldNotUpdate) this.reRender();
  }

}

function initialize() {
  const state = new State();

  function autoUpdate(...params) {
    const descriptor = params[2];
    const oldRender = descriptor.value;

    descriptor.value = function render() {
      if (!state.update) {
        state.update = this.forceUpdate.bind(this);
        state.init({
          ...this.props,
          nextSelected: filterArrayOfSelected(this.props.defaultSelected),
        });
      }
      return oldRender.call(this, state.calendar);
    };
    return descriptor;
  }

  return {
    state,
    autoUpdate,
  };
}

export default initialize;

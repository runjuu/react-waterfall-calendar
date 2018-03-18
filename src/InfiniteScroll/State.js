import _ from 'lodash';

class State
{
  constructor(context) {
    this.context = context;

    this.interval = { months: 24 };

    document.addEventListener('scroll', _.throttle(
      this.handlePageScroll.bind(this),
      300
    ))
  }

  getMoreInterval() {
    this.interval = { months: this.interval.months + 24 };
    return this.interval;
  }

  handlePageScroll() {
    const offset = window.innerHeight * 3;
    if ((offset + window.scrollY) >= document.body.offsetHeight) {
      this.context.setState({ interval: this.getMoreInterval() })
    }
  }

}

export default State;

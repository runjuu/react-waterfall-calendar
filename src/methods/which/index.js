import moment from 'moment';

function whichDay(diff) {
  switch (true) {
    case diff > 0:
      return 'FUTURE';
    case diff < 0:
      return 'PAST';
    default:
      return 'CURRENT';
  }
}

const which = (diff) => {
  if (typeof diff === 'number') {
    return whichDay(diff);
  } else if (diff && typeof diff === 'object') {
    const currentDate = diff.current === undefined ? new Date() : new Date(diff.current);
    const targetDate = diff.target === undefined ? new Date() : new Date(diff.target);

    switch (true) {
      case currentDate.toDateString().toLowerCase().indexOf('invalid date') !== -1:
      case targetDate.toDateString().toLowerCase().indexOf('invalid date') !== -1:
      case !diff.current && diff.current !== undefined:
      case !diff.target && diff.target !== undefined:
        return null;
      default:
        return whichDay(moment(diff.target).diff(diff.current, 'days'));
    }
  }
  return null;
};

export default which;

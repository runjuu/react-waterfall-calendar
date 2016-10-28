import moment from 'moment';

function setDay({
    thisMonth,
    firstDayOfTheMonth,
    daysInMonth,
  }, i, type) {
  const obj = {};
  switch (type) {
    case 'lastMonth':
      obj.date = moment(thisMonth).subtract(firstDayOfTheMonth - i, 'd').format('YYYY-MM-DD');
      break;
    case 'nextMonth':
      obj.date = moment(thisMonth).add(i - firstDayOfTheMonth - daysInMonth, 'd').format('YYYY-MM-DD');
      break;
    case 'currentMonth':
      obj.date = moment(thisMonth).add(i - firstDayOfTheMonth, 'd').format('YYYY-MM-DD');
      break;
    default:
      break;
  }
  obj.type = type;
  obj.day = moment(obj.date).format('D');
  return obj;
}

function filter(date) {
  const table = [];
  const total = 42;
  const thisMonth = moment(date).format('YYYY-MM');
  // 获取 firstDayOfTheMonth 以确定本月第一天所处的位置
  const firstDayOfTheMonth = moment(thisMonth).day();
  // 一个月总共的天数
  const daysInMonth = moment(thisMonth).daysInMonth();
  // 循环该月日历总显示日期
  for (let i = 0; i < total; i += 1) {
    const row = parseInt(i / 7, 10);
    table[row] = table[row] || [];
    if (i < firstDayOfTheMonth) {
      table[row].push(
        setDay({
          thisMonth,
          firstDayOfTheMonth,
          daysInMonth,
        }, i, 'lastMonth')
      );
    } else if (i - firstDayOfTheMonth > daysInMonth) {
      table[row].push(
        setDay({
          thisMonth,
          firstDayOfTheMonth,
          daysInMonth,
        }, i, 'nextMonth')
      );
    } else {
      table[row].push(
        setDay({
          thisMonth,
          firstDayOfTheMonth,
          daysInMonth,
        }, i, 'currentMonth')
      );
    }
  }
  return table;
}

export default function dateTable(
  state = [],
  action) {
    switch (action.type) {
      case 'GET_DATE_TABLE':
        return filter(action.date || moment().format('YYYY-MM-DD'));
      default:
        return state;
    }
}

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
      obj.date = moment(thisMonth).add(1, 'M').add(i - firstDayOfTheMonth - daysInMonth, 'd').format('YYYY-MM-DD');
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

function getWeekTitle({ Su = 'Su', Mo = 'Mo', Tu = 'Tu', We = 'We', Th = 'Th', Fr = 'Fr', Sa = 'Sa' }, firstDayOfTheWeek) {
  const defaultWeek = [Su, Mo, Tu, We, Th, Fr, Sa];
  const weekSort = defaultWeek.slice(firstDayOfTheWeek);
  return weekSort.concat(defaultWeek.slice(0, defaultWeek.length - weekSort.length));
}

function getTable(date, firstDayOfTheWeek) {
  const table = [];
  const day = [];
  const total = 42;
  const thisMonth = moment(date).format('YYYY-MM');
  // 获取 firstDayOfTheMonth 以确定本月第一天所处的位置
  const firstDayOfTheMonth = moment(thisMonth).day();
  // 一个月总共的天数
  const daysInMonth = moment(thisMonth).daysInMonth();
  // 生成该月日历总显示日期的一维数组
  for (let i = 0; i < total; i += 1) {
    if (i < firstDayOfTheMonth) {
      day.push(
        setDay({
          thisMonth,
          firstDayOfTheMonth,
          daysInMonth },
        i, 'lastMonth'));
    } else if (i - firstDayOfTheMonth > daysInMonth - 1) {
      day.push(
        setDay({
          thisMonth,
          firstDayOfTheMonth,
          daysInMonth },
        i, 'nextMonth'));
    } else {
      day.push(
        setDay({
          thisMonth,
          firstDayOfTheMonth,
          daysInMonth },
        i, 'currentMonth'));
    }
  }
  // 根据 firstDayOfTheWeek 进行周排序
  const week = day.slice(firstDayOfTheWeek);
  const len = week.length;
  const lastDay = moment(week[week.length - 1].date);
  // 根据最后一位日期与 week.length 进行填充
  for (let w = 0; w < total - len; w += 1) {
    week.push({
      type: 'nextMonth',
      date: lastDay.add(1, 'd').format('YYYY-MM-DD'),
      day: lastDay.format('D'),
    });
    console.log(lastDay.format('YYYY-MM-DD'));
  }
  for (let t = 0; t < 6; t += 1) {
    table.push(
      week.slice(7 * t, 7 * (t + 1))
    );
  }
  return table;
}

function filter(date, { firstDayOfTheWeek = 0, weekNamed }) {
  const table = getTable(date, firstDayOfTheWeek);
  const weekTitle = getWeekTitle(weekNamed, firstDayOfTheWeek);
  return {
    table,
    weekTitle,
  };
}

export default function dateTable(
  state = {
    table: [],
    weekTitle: [],
  },
  {
    type,
    date = moment().format('YYYY-MM-DD'),
    config = {
      firstDayOfTheWeek: 0,
      weekNamed: {
        Su: 'Su',
        Mo: 'Mo',
        Tu: 'Tu',
        We: 'We',
        Th: 'Th',
        Fr: 'Fr',
        Sa: 'Sa',
      },
    },
  }) {
  switch (type) {
    case 'GET_DATE_TABLE':
      return filter(date, config);
    default:
      return state;
  }
}

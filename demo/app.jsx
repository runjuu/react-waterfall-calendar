import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Calendar from '../src/';
import style from './style.sass';

const {
  store,
  Title,
  VisibleDateTable,
  goLastMonth,
  goNextMonth,
} = Calendar;

const weekNamed = {
  Su: '日',
  Mo: '月',
  Tu: '火',
  We: '水',
  Th: '木',
  Fr: '金',
  Sa: '土',
};

const customize = {
  '2016-10-30': {
    data: 'test',
    classname: style.tag,
  },
  '2016-10-31': {
    data: 'test',
    classname: style.tag,
  },
  '2016-11-01': {
    data: 'test',
    classname: style.tag,
  },
};
function onClick({ date }) {
  console.log('onClick', date);
}

render(
  <Provider store={store}>
    <div>
      <header>
        <button type="button" onClick={goLastMonth}>last</button>
        <button type="button" onClick={goNextMonth}>next</button>
        <Title
          format="YYYY年MM月"
          classname={style.title}
        />
      </header>
      <VisibleDateTable
        classname={style.dateTable}
        todayClassName={style.today}
        otherMonthClassName={style.otherMonth}
        selectedClassName={style.selected}
        clickCallback={onClick}
        customize={customize}
        config={{
          firstDayOfTheWeek: 0,
          weekNamed,
        }}
      />
    </div>
  </Provider>,
  document.getElementById('root')
);

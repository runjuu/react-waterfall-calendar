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

render(
  <Provider store={store}>
    <div>
      <header>
        <button type="button" onClick={goLastMonth}>last</button>
        <Title
          format="YYYY年MM月"
          classname={style.title}
        />
        <button type="button" onClick={goNextMonth}>next</button>
      </header>
      <VisibleDateTable />
    </div>
  </Provider>,
  document.getElementById('root')
);

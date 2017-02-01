import React from 'react';
import Calendar from '../../src/';
import CalendarStyle from '../../style.css';
import style from './style.sass';

const Demo = () => (
  <div>
    <Calendar
      defaultStyle={CalendarStyle}
      customizeStyle={style}
    />
  </div>
);

export default Demo;

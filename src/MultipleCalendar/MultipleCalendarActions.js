export const SET_MULTIPLECALENDAR = 'SET_MULTIPLECALENDAR';
export const ADD_MULTIPLECALENDAR = 'ADD_MULTIPLECALENDAR';
export const RESET_MULTIPLECALENDAR = 'RESET_MULTIPLECALENDAR';

export const setMultipleCalendar = ({ from, to, firstWeekDay }) => ({
  type: SET_MULTIPLECALENDAR,
  firstWeekDay,
  from,
  to,
});

export const updateMultipleCalendar = () => ({
  type: ADD_MULTIPLECALENDAR,
});

export const resetMultipleCalendar = () => ({
  type: RESET_MULTIPLECALENDAR,
});

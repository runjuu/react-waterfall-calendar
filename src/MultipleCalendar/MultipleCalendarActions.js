export const SET_MULTIPLECALENDAR = 'SET_MULTIPLECALENDAR';

export const setMultipleCalendar = ({ from, to }) => ({
  type: SET_MULTIPLECALENDAR,
  from,
  to,
});

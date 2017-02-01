export const INIT_MULTIPLECALENDAR = 'INIT_MULTIPLECALENDAR';

export const setMultipleCalendar = ({ from, to }) => ({
  type: INIT_MULTIPLECALENDAR,
  from,
  to,
});

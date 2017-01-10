export const INIT_MULTIPLECALENDAR = 'INIT_MULTIPLECALENDAR';

export const initMultipleCalendar = ({ from, to }) => ({
  type: INIT_MULTIPLECALENDAR,
  from,
  to,
});

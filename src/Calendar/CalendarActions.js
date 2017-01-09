export const INIT_CALENDAR = 'INIT_CALENDAR';
export const TO_CURRENT_MONTH = 'TO_CURRENT_MONTH';
export const TO_NEXT_MONTH = 'TO_NEXT_MONTH';
export const TO_LAST_MONTH = 'TO_LAST_MONTH';

export const initCalendar = (style, event) => ({
  type: INIT_CALENDAR,
  style,
  event,
});

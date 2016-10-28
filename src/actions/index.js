export const formatTitle = format => ({
  type: 'TITLE_FORMAT',
  format,
});

export const setSelectType = theType => ({
  type: 'SET_SELECT_TYPE',
  theType,
});

export const getDateTable = (date, config) => ({
  type: 'GET_DATE_TABLE',
  date,
  config,
});

export const goNextMonth = () => ({
  type: 'GO_NEXT_MONTH',
});

export const goLastMonth = () => ({
  type: 'GO_LAST_MONTH',
});

export const onClickDate = (date, callback) => ({
  type: 'ON_CLICK_DATE',
  callback,
  date,
});

export default function actions(store) {
  return {
    goLastMonth: () => {
      store.dispatch(goLastMonth());
      store.dispatch(
        getDateTable(store.getState().date)
      );
    },
    goNextMonth: () => {
      store.dispatch(goNextMonth());
      store.dispatch(
        getDateTable(store.getState().date)
      );
    },
  };
}

export const goNextMonth = () => ({
  type: 'GO_NEXT_MONTH',
});

export const goLastMonth = () => ({
  type: 'GO_LAST_MONTH',
});

export const formatTitle = format => ({
  type: 'TITLE_FORMAT',
  format,
});

export const getDateTable = date => ({
  type: 'GET_DATE_TABLE',
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

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

export default function actions(store) {
  return {
    goLastMonth: () => {
      store.dispatch(goLastMonth());
    },
    goNextMonth: () => {
      store.dispatch(goNextMonth());
    },
  };
}

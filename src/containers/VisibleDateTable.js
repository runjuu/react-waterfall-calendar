import { connect } from 'react-redux';
import DateTable from '../component/DateTable';

const mapDate = (state) => {
  const events = state.events;
  if (state.selectType === 'single') {
    const isSelected = {};
    isSelected[state.events.clickDate] = state.events.isSelected[state.events.clickDate];
    events.isSelected = isSelected;
  }
  return ({
    date: state.date,
    events,
    dateTable: state.dateTable,
    onClickDate: state.onClickDate,
  });
};

const VisibleDateTable = connect(
  mapDate
)(DateTable);

export default VisibleDateTable;

import { connect } from 'react-redux';
import DateTable from '../component/DateTable';
import { getDateTable } from '../actions';


const mapDate = state => ({
  date: state.date,
  dateTable: state.dateTable,
});

const VisibleDateTable = connect(
  mapDate
)(DateTable);

export default VisibleDateTable;

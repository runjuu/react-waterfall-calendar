import { connect } from 'react-redux';
import DateTable from '../component/DateTable';

const mapDate = state => ({
  data: state.dateTable,
});

const VisibleDateTable = connect(
  mapDate
)(DateTable);

export default VisibleDateTable;

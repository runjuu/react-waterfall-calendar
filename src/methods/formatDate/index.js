import moment from 'moment';

const formatDate = day => (moment(day).format('YYYY-MM-DD'));

export default formatDate;

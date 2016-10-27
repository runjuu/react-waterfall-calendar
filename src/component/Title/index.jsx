import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { formatTitle } from '../../actions';

function Title({ title, classname, format, dispatch }) {
  if (format) dispatch(formatTitle(format));
  return (
    <h1 className={classname}>{title}</h1>
  );
}

function getTitle(state) {
  const title = moment(state.date).format(state.titleFormat);
  return ({
    title,
  });
}

Title.propTypes = {
  title: PropTypes.string,
  format: PropTypes.string,
  classname: PropTypes.string,
  dispatch: PropTypes.func,
};

export default connect(getTitle)(Title);

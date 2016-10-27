import React, { PropTypes } from 'react';

const DateTable = ({ data, onClick }) => (
  <div >
    {data.map((column, c) => (
      <section >
        {column.arr.map((row, r) => (
          <div data-column={c} data-row={r}>
            <a onClick={onClick} href={`#${row.date}`}>row.day</a>
          </div>
        ))}
      </section>
    ))}
  </div>
);

DateTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string,
    date: PropTypes.string,
    selected: PropTypes.bool,
    type: PropTypes.string,
  })),
  onClick: PropTypes.func,
};

export default DateTable;

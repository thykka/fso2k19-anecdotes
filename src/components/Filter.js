import React from 'react';
import { connect } from 'react-redux';
import { updateFilter } from '../reducers/filterReducer';

const Filter = props => {
  const handleChange = evt => {
    props.updateFilter(evt.currentTarget.value);
  };

  return (
    <div>
      <label>Filter <input onChange={handleChange} /></label>
    </div>
  );
};

const mapDispatchToProps = {
  updateFilter
};

export default connect(null, mapDispatchToProps)(Filter);

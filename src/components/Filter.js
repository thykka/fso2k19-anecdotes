import React from 'react';

const Filter = props => {
  const handleChange = evt => {
    props.store.dispatch({ type: 'UPDATE_FILTER', filter: evt.currentTarget.value });
  };

  return (
    <div>
      <label>Filter <input onChange={handleChange} /></label>
    </div>
  );
};

export default Filter;

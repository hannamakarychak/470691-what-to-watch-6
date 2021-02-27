import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <span className="visually-hidden">Loading</span>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle className="spinner__path" cx="25" cy="25" r="20" fill="#c9b37e;" strokeWidth="5"></circle>
      </svg>
    </div>
  );
};

export default Spinner;
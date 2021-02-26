import React from 'react';
import PropTypes from 'prop-types';

const ShowMore = (props) => {
  return (
    <div className="catalog__more" onClick={props.onClick}>
      <button className="catalog__button" type="button">Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onClick: PropTypes.func
};

export default ShowMore;

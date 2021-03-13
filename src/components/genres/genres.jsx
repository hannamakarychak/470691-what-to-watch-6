import React from 'react';
import PropTypes from 'prop-types';

const Genres = (props) => {
  return (
    <ul className="catalog__genres-list">
      {props.genres.map((genre) => (
        <li
          key={genre}
          onClick={() => props.onGenreSelect(genre)}
          className={`catalog__genres-item ${props.selectedGenre === genre ? `catalog__genres-item--active` : ``}`}
        >
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreSelect: PropTypes.func
};

export default Genres;

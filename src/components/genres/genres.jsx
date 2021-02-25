import React from 'react';
import PropTypes from 'prop-types';

import {moviePropTypes} from '../../prop-types';
import {getUniqueGenres} from '../../utils';

const Genres = (props) => {
  const genres = getUniqueGenres(props.movies);
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
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
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreSelect: PropTypes.func
};

export default Genres;

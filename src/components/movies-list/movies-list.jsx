import React, {Fragment, useState} from 'react';
import MovieCard from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import {moviePropTypes} from '../../prop-types';

const MoviesList = (props) => {
  const [activeMovieCard, setActiveMovieCard] = useState(null);

  return (
    <Fragment>
      <div className="catalog__movies-list">
        {props.movies.map((el) => (
          <MovieCard
            key={el.id}
            title={el.name}
            imgSrc={el.preview_image}
            id={el.id}
            onMouseEnter={() => setActiveMovieCard(el.id)}
            onMouseLeave={() => setActiveMovieCard(null)}
          />
        ))}
      </div>
    </Fragment>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes)
};

export default MoviesList;

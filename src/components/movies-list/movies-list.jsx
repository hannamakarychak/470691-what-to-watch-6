import React, {Fragment} from 'react';
import MovieCard from '../movie-card/movie-card';
import PropTypes from 'prop-types';
import {moviePropTypes} from '../../prop-types';

const MoviesList = (props) => {
  return (
    <Fragment>
      <div className="catalog__movies-list">
        {props.movies.map((el) => (
          <MovieCard
            key={el.id}
            title={el.name}
            imgSrc={el.previewImage}
            id={el.id}
            videoSrc={el.previewVideoLink}
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

import React, {useState} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {setGenre} from "../../store/action";
import {allGenresSelector, moviesByGenreSelector, selectedGenreSelector} from "../../store/all-movies/selectors";
import Genres from "../genres/genres";
import MoviesList from "../movies-list/movies-list";
import ShowMore from "../show-more/show-more";
import {moviePropTypes} from "../../prop-types";

const MOVIE_COUNT = 8;

const Catalog = ({allGenres, selectedGenre, changeGenre, movies}) => {
  const [movieCount, setMovieCount] = useState(MOVIE_COUNT);

  const handleShowMoreClick = () => setMovieCount((currentCount) => currentCount + MOVIE_COUNT);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <Genres genres={allGenres} onGenreSelect={changeGenre} selectedGenre={selectedGenre} />

      <MoviesList movies={movies.slice(0, movieCount)} />

      {movieCount < movies.length && <ShowMore onClick={handleShowMoreClick} />}
    </section>
  );
};

Catalog.propTypes = {
  selectedGenre: PropTypes.string,
  changeGenre: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  allGenres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  allGenres: allGenresSelector(state),
  selectedGenre: selectedGenreSelector(state),
  movies: moviesByGenreSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre(genre) {
    dispatch(setGenre(genre));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

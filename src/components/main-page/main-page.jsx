import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {moviePropTypes} from '../../prop-types';
import MoviesList from '../movies-list/movies-list';
import Header from '../header/header';
import Footer from '../footer/footer';
import {useHistory} from 'react-router-dom';
import {ActionCreator} from '../../store/action';
import {connect} from 'react-redux';
import Genres from '../genres/genres';
import {getMoviesBySelectedGenre} from '../../utils';
import ShowMore from '../show-more/show-more';
import {fetchMoviesList, checkAuth} from '../../api-actions';
import Spinner from '../spinner/spinner';

const MOVIE_COUNT = 8;

const MainPage = ({promoFilm, movies, selectedGenre, setGenre, isDataLoaded, onLoadData}) => {
  const history = useHistory();
  const [movieCount, setMovieCount] = useState(MOVIE_COUNT);

  const moviesBySelectedGenre = getMoviesBySelectedGenre(movies, selectedGenre);

  const handleShowMoreClick = () => setMovieCount((currentCount) => currentCount + MOVIE_COUNT);

  useEffect(() => {
    if (!isDataLoaded) {
      onLoadData();
    }
  }, [isDataLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isDataLoaded) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header isLoggedIn />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt={`${promoFilm.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoFilm.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoFilm.genre}</span>
                <span className="movie-card__year">{promoFilm.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => history.push(`/films/${promoFilm.id}/player`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div >
      </section >

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <Genres movies={movies} onGenreSelect={setGenre} selectedGenre={selectedGenre} />

          <MoviesList movies={moviesBySelectedGenre.slice(0, movieCount)} />

          {movieCount < moviesBySelectedGenre.length && <ShowMore onClick={handleShowMoreClick} />}
        </section>

        <Footer />
      </div>
    </Fragment>
  );
};


MainPage.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  promoFilm: moviePropTypes.isRequired,
  selectedGenre: PropTypes.string,
  setGenre: PropTypes.func.isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  selectedGenre: state.genre,
  movies: state.list,
  isDataLoaded: state.isDataLoaded
});

const mapDispatchToProps = (dispatch) => ({
  setGenre(genre) {
    dispatch(ActionCreator.setGenre(genre));
  },
  onLoadData() {
    dispatch(fetchMoviesList());
  }
});


export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

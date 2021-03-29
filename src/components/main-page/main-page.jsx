import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';

import FavoriteButton from './../favorite-button/favorite-button';
import {moviePropTypes} from '../../prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addToMyList, fetchMoviesList, fetchPromoMovie} from '../../api-actions';
import Spinner from '../spinner/spinner';
import {allMoviesLoadedSelector} from '../../store/all-movies/selectors';
import Catalog from './../catalog/catalog';
import {selectedMovieLoadedSelector, selectedMovieSelector} from '../../store/selected-movie/selectors';
import {isUserLoggedInSelector} from '../../store/user/selectors';

const MainPage = ({
  promoMovie,
  isAllMoviesLoaded,
  onLoadMoviesList,
  isPromoMovieLoaded,
  onLoadPromoMovie,
  onSetFavorite,
  isLoggedIn
}) => {
  useEffect(() => {
    if (!isAllMoviesLoaded) {
      onLoadMoviesList();
    }
  }, [isAllMoviesLoaded, onLoadMoviesList]);

  useEffect(() => {
    onLoadPromoMovie();
  }, [isPromoMovieLoaded, onLoadPromoMovie]);

  if (!isPromoMovieLoaded || !isAllMoviesLoaded) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={promoMovie.backgroundImage} alt={promoMovie.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={promoMovie.posterImage}
                alt={`${promoMovie.name} poster`}
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoMovie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovie.genre}</span>
                <span className="movie-card__year">{promoMovie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link
                  className="btn btn--play movie-card__button"
                  to={`/player/${promoMovie.id}`}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
                {isLoggedIn &&
                  <FavoriteButton
                    onClick={() => onSetFavorite(promoMovie.id, !promoMovie.isFavorite)}
                    isFavorite={promoMovie.isFavorite}
                  />
                }
              </div>
            </div>
          </div>
        </div >
      </section >

      <div className="page-content">
        <Catalog />

        <Footer />
      </div>
    </Fragment>
  );
};


MainPage.propTypes = {
  promoMovie: moviePropTypes,
  isAllMoviesLoaded: PropTypes.bool.isRequired,
  onLoadMoviesList: PropTypes.func.isRequired,
  isPromoMovieLoaded: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLoadPromoMovie: PropTypes.func.isRequired,
  onSetFavorite: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isAllMoviesLoaded: allMoviesLoadedSelector(state),
  isPromoMovieLoaded: selectedMovieLoadedSelector(state),
  promoMovie: selectedMovieSelector(state),
  isLoggedIn: isUserLoggedInSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMoviesList() {
    dispatch(fetchMoviesList());
  },
  onLoadPromoMovie() {
    dispatch(fetchPromoMovie());
  },
  onSetFavorite(movieId, isFavorite) {
    dispatch(addToMyList(movieId, isFavorite));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

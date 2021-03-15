import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';

import {moviePropTypes} from '../../prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchMoviesList} from '../../api-actions';
import Spinner from '../spinner/spinner';
import {allMoviesLoadedSelector} from '../../store/all-movies/selectors';
import Catalog from './../catalog/catalog';

const MainPage = ({promoFilm, isLoaded, onLoadMoviesList}) => {
  useEffect(() => {
    if (!isLoaded) {
      onLoadMoviesList();
    }
  }, [isLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

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
                <Link
                  className="btn btn--play movie-card__button"
                  to={{
                    pathname: `/player/${promoFilm.id}`,
                    isPromo: true
                  }}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>
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
        <Catalog />

        <Footer />
      </div>
    </Fragment>
  );
};


MainPage.propTypes = {
  promoFilm: moviePropTypes.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  onLoadMoviesList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoaded: allMoviesLoadedSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMoviesList() {
    dispatch(fetchMoviesList());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

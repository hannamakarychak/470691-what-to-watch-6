import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, useParams} from 'react-router-dom';

import Footer from '../footer/footer';
import Header from '../header/header';
import MoviesList from '../movies-list/movies-list';
import {moviePropTypes, reviewPropTypes} from '../../prop-types';
import Tabs from '../tabs/tabs';
import {addToMyList, fetchFilm, fetchMoviesList, fetchReviews} from '../../api-actions';
import Spinner from '../spinner/spinner';
import {allMoviesLoadedSelector} from '../../store/all-movies/selectors';
import {selectedMovieSelector, selectedMovieLoadedSelector, relatedMoviesSelector} from '../../store/selected-movie/selectors';
import {reviewsIsLoadedSelector, reviewsSelector} from '../../store/reviews/selectors';
import {isUserLoggedInSelector} from '../../store/user/selectors';
import FavoriteButton from '../favorite-button/favorite-button';

const MoviePage = (props) => {
  const {
    onLoadMovie,
    isMoviesListLoaded,
    onLoadMoviesList,
    onLoadReviews,
    movie,
    isMovieLoaded,
    relatedMovies,
    reviews,
    isLoggedIn,
    isReviewsLoaded,
    onSetFavorite
  } = props;

  const params = useParams();
  const currentMovieId = params.id;

  useEffect(() => {
    onLoadMovie(currentMovieId);
  }, [currentMovieId, onLoadMovie]);

  useEffect(() => {
    if (!isMoviesListLoaded) {
      onLoadMoviesList();
    }
  }, [isMoviesListLoaded, onLoadMoviesList]);

  useEffect(() => {
    onLoadReviews(currentMovieId);

  }, [currentMovieId, onLoadReviews]);

  if (!isMoviesListLoaded || !isMovieLoaded || !isReviewsLoaded) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section
        className="movie-card movie-card--full"
        style={{
          background: movie.backgroundColor
        }}
      >
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={movie.backgroundImage} alt={movie.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className="movie-card__head" isLoggedIn />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{movie.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{movie.genre}</span>
                <span className="movie-card__year">{movie.released}</span>
              </p>

              <div className="movie-card__buttons">
                <Link
                  to={`/player/${currentMovieId}`}
                  className="btn btn--play movie-card__button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                {isLoggedIn &&
                  <Fragment>
                    <FavoriteButton
                      onClick={() => onSetFavorite(movie.id, !movie.isFavorite)}
                      isFavorite={movie.isFavorite}
                    />
                    <Link to={`/films/${currentMovieId}/review`} className="btn movie-card__button">Add review</Link>
                  </Fragment>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={movie.posterImage} alt={movie.name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <Tabs
                rating={movie.rating}
                scoresCount={movie.scoresCount}
                director={movie.director}
                starring={movie.starring}
                description={movie.description}
                genre={movie.genre}
                released={movie.released}
                runTime={movie.runTime}
                reviews={reviews}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        {relatedMovies.length > 0 && <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesList movies={relatedMovies} />
        </section>}

        <Footer />
      </div>
    </Fragment>
  );
};


MoviePage.propTypes = {
  movie: moviePropTypes,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  isMoviesListLoaded: PropTypes.bool.isRequired,
  onLoadMoviesList: PropTypes.func.isRequired,
  relatedMovies: PropTypes.arrayOf(moviePropTypes).isRequired,
  onLoadMovie: PropTypes.func.isRequired,
  isMovieLoaded: PropTypes.bool.isRequired,
  isReviewsLoaded: PropTypes.bool.isRequired,
  onLoadReviews: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onSetFavorite: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  relatedMovies: relatedMoviesSelector(state),
  isMoviesListLoaded: allMoviesLoadedSelector(state),
  movie: selectedMovieSelector(state),
  isMovieLoaded: selectedMovieLoadedSelector(state),
  reviews: reviewsSelector(state),
  isReviewsLoaded: reviewsIsLoadedSelector(state),
  isLoggedIn: isUserLoggedInSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMoviesList() {
    dispatch(fetchMoviesList());
  },
  onLoadMovie(id) {
    dispatch(fetchFilm(id));
  },
  onLoadReviews(reviews) {
    dispatch(fetchReviews(reviews));
  },
  onSetFavorite(movieId, isFavorite) {
    dispatch(addToMyList(movieId, isFavorite));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);


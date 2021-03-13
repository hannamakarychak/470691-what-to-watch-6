import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useParams} from 'react-router-dom';

import Footer from '../footer/footer';
import Header from '../header/header';
import MoviesList from '../movies-list/movies-list';
import {moviePropTypes, reviewPropTypes} from '../../prop-types';
import Tabs from '../tabs/tabs';
import {connect} from 'react-redux';
import {fetchFilm, fetchMoviesList, fetchReviews} from '../../api-actions';
import Spinner from '../spinner/spinner';
import {getMoviesBySelectedGenre} from '../../utils';
import {AuthorizationStatus} from '../../constants';

const MoviePage = (props) => {
  const {
    onLoadMovie,
    isMoviesListLoaded,
    onLoadMoviesList,
    onLoadReviews,
    film,
    isMovieLoaded,
    movies,
    reviews,
    isLoggedIn
  } = props;

  const params = useParams();
  const currentMovieId = params.id;
  const history = useHistory();

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

  if (!isMoviesListLoaded || !isMovieLoaded) {
    return <Spinner />;
  }

  const relatedMovies = getMoviesBySelectedGenre(movies, film.genre).filter(({id}) => id !== +currentMovieId).slice(0, 4);

  return (
    <Fragment>
      <section
        className="movie-card movie-card--full"
        style={{
          background: film.background_color
        }}
      >
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={film.background_image} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className="movie-card__head" isLoggedIn />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{film.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{film.genre}</span>
                <span className="movie-card__year">{film.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => history.push(`/films/${currentMovieId}/player`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={film.isFavorite ? `#in-list` : `#add`}></use>
                  </svg>
                  <span>My list</span>
                </button>
                {isLoggedIn && <Link to={`/films/${currentMovieId}/review`} className="btn movie-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={film.poster_image} alt={film.name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <Tabs
                rating={film.rating}
                scoresCount={film.scores_count}
                director={film.director}
                starring={film.starring}
                description={film.description}
                genre={film.genre}
                released={film.released}
                runTime={film.run_time}
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
  film: moviePropTypes,
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  isMoviesListLoaded: PropTypes.bool.isRequired,
  onLoadMoviesList: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  onLoadMovie: PropTypes.func.isRequired,
  isMovieLoaded: PropTypes.bool.isRequired,
  isReviewsLoaded: PropTypes.bool.isRequired,
  onLoadReviews: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  movies: state.list,
  isMoviesListLoaded: state.isMoviesListLoaded,
  film: state.film,
  isMovieLoaded: state.isMovieLoaded,
  isReviewsLoaded: state.isReviewsLoaded,
  reviews: state.reviews,
  isLoggedIn: state.authorizationStatus === AuthorizationStatus.AUTH
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
  }
});

export {MoviePage};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);


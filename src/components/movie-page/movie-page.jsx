import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Link, useHistory, useParams} from 'react-router-dom';

import Footer from '../footer/footer';
import Header from '../header/header';
import MoviesList from '../movies-list/movies-list';
import {moviePropTypes, reviewPropTypes} from '../../prop-types';
import Tabs from '../tabs/tabs';
import {connect} from 'react-redux';
import {fetchMoviesList} from '../../api-actions';
import Spinner from '../spinner/spinner';
import {getMoviesBySelectedGenre} from '../../utils';

const MoviePage = (props) => {
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!props.isDataLoaded) {
      props.onLoadData();
    }
  }, [props.isDataLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!props.isDataLoaded) {
    return <Spinner />;
  }

  const moviesBySelectedGenre = getMoviesBySelectedGenre(props.movies, props.selectedGenre);
  const slicedMoviesBySelectedGenre = moviesBySelectedGenre.slice(0, 3);

  return (
    <Fragment>
      <section
        className="movie-card movie-card--full"
        style={{
          background: props.bgColor
        }}
      >
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={props.bgImgSrc} alt={props.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header className="movie-card__head" isLoggedIn />

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{props.name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{props.genre}</span>
                <span className="movie-card__year">{props.released}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => history.push(`/films/${params.id}/player`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref={props.isFavorite ? `#in-list` : `#add`}></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link to={`/films/${params.id}/review`} className="btn movie-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={props.imgSrc} alt={props.name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <Tabs
                rating={props.rating}
                scoresCount={props.scoresCount}
                director={props.director}
                starring={props.starring}
                description={props.description}
                genre={props.genre}
                released={props.released}
                runTime={props.runTime}
                reviews={props.reviews}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <MoviesList movies={slicedMoviesBySelectedGenre} />
        </section>

        <Footer />
      </div>
    </Fragment>
  );
};


MoviePage.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  scoresCount: PropTypes.number.isRequired,
  bgImgSrc: PropTypes.string.isRequired,
  bgColor: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  runTime: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  relatedMovies: PropTypes.arrayOf(moviePropTypes),
  reviews: PropTypes.arrayOf(reviewPropTypes).isRequired,
  isDataLoaded: PropTypes.bool.isRequired,
  onLoadData: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  selectedGenre: PropTypes.string
};

const mapStateToProps = (state) => ({
  selectedGenre: state.genre,
  movies: state.list,
  isDataLoaded: state.isDataLoaded
});

const mapDispatchToProps = (dispatch) => ({
  onLoadData() {
    dispatch(fetchMoviesList());
  }
});

export {MoviePage};

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);


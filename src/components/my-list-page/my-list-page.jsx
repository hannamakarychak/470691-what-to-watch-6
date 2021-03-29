import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MoviesList from '../movies-list/movies-list';
import {moviePropTypes} from '../../prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import {fetchMoviesList} from '../../api-actions';
import {allMoviesLoadedSelector, favoriteMoviesSelector} from '../../store/all-movies/selectors';
import Spinner from '../spinner/spinner';

const MyListPage = ({onLoadMoviesList, movies, isAllMoviesLoaded}) => {
  useEffect(() => {
    if (!isAllMoviesLoaded) {
      onLoadMoviesList();
    }
  }, [isAllMoviesLoaded, onLoadMoviesList]);

  if (!isAllMoviesLoaded) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <div className="user-page">
        <Header className="user-page__head">
          <h1 className="page-title user-page__title">My list</h1>
        </Header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <MoviesList movies={movies} />
        </section>

        <Footer />
      </div>
    </Fragment>
  );
};

MyListPage.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes),
  isAllMoviesLoaded: PropTypes.bool.isRequired,
  onLoadMoviesList: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  movies: favoriteMoviesSelector(state),
  isAllMoviesLoaded: allMoviesLoadedSelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMoviesList() {
    dispatch(fetchMoviesList());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyListPage);


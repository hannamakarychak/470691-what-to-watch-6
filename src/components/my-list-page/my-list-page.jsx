import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {moviePropTypes} from '../../prop-types';

import MoviesList from '../movies-list/movies-list';
import Header from '../header/header';
import Footer from '../footer/footer';

const MyListPage = (props) => {
  return (
    <Fragment>
      <div className="user-page">
        <Header className="user-page__head" isLoggedIn>
          <h1 className="page-title user-page__title">My list</h1>
        </Header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <MoviesList movies={props.movies} />
        </section>

        <Footer />
      </div>
    </Fragment>
  );
};

MyListPage.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes)
};

export default MyListPage;


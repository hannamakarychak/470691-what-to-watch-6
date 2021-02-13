import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SignInPage from '../sign-in-page/sign-in-page';
import MainPage from '../main-page/main-page';
import MyListPage from '../my-list-page/my-list-page';
import MoviePage from '../movie-page/movie-page';
import AddReviewPage from '../add-review-page/add-review-page';
import PlayerPage from '../player-page/player-page';
import {moviePropTypes} from '../../prop-types';


const App = ({movies, promoFilm}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <MainPage movies={movies} promoFilm={promoFilm} />
        </Route>
        <Route exact path="/login">
          <SignInPage />
        </Route>
        <Route exact path="/mylist">
          <MyListPage />
        </Route>
        <Route exact path="/films/:id">
          <MoviePage />
        </Route>
        <Route exact path="/films/:id/review">
          <AddReviewPage />
        </Route>
        <Route exact path="/player/:id">
          <PlayerPage />
        </Route>
        <Route
          render={() => (
            <Fragment>
              <div className="user-page">
                <header className="page-header user-page__head">
                  <div className="logo">
                    <a href="/" className="logo__link">
                      <span className="logo__letter logo__letter--1">W</span>
                      <span className="logo__letter logo__letter--2">T</span>
                      <span className="logo__letter logo__letter--3">W</span>
                    </a>
                  </div>
                </header>
                <h1 className="page-title user-page__title">404.<br></br>
                  <small>Page not found</small>
                </h1>
              </div>
            </Fragment>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};


App.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  promoFilm: moviePropTypes.isRequired,
};

export default App;

import React from 'react';
import PropTypes from 'prop-types';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';

import SignInPage from '../sign-in-page/sign-in-page';
import MainPage from '../main-page/main-page';
import MyListPage from '../my-list-page/my-list-page';
import MoviePage from '../movie-page/movie-page';
import AddReviewPage from '../add-review-page/add-review-page';
import PlayerPage from '../player-page/player-page';
import {moviePropTypes} from '../../prop-types';
import Header from '../header/header';
import PrivateRoute from '../private-route/private-route';
import browserHistory from "../../browser-history";

const App = ({movies, promoFilm}) => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <MainPage promoFilm={promoFilm} />
        </Route>
        <Route exact path="/login">
          <SignInPage />
        </Route>
        <PrivateRoute
          exact
          path="/mylist"
          render={() => <MyListPage movies={movies} />}>
        </PrivateRoute>
        <Route exact path="/films/:id">
          <MoviePage />
        </Route>
        <PrivateRoute
          exact
          path="/films/:id/review"
          render={() => <AddReviewPage name={movies[0].name} imgSrc={movies[0].preview_image} />}>
        </PrivateRoute>
        <Route exact path="/player/:id">
          <PlayerPage />
        </Route>
        <Route
          render={() => (
            <div className="user-page">
              <Header className="user-page__head" />
              <h1 className="page-title user-page__title">404.<br></br>
                <small>Page not found</small>
              </h1>
            </div>
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};


App.propTypes = {
  movies: PropTypes.arrayOf(moviePropTypes).isRequired,
  promoFilm: moviePropTypes.isRequired
};

export default App;

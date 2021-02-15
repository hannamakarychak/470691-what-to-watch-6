import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SignInPage from '../sign-in-page/sign-in-page';
import MainPage from '../main-page/main-page';
import MyListPage from '../my-list-page/my-list-page';
import MoviePage from '../movie-page/movie-page';
import AddReviewPage from '../add-review-page/add-review-page';
import PlayerPage from '../player-page/player-page';
import {moviePropTypes} from '../../prop-types';
import Header from '../header/header';
import films from '../../mocks/films';

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
          <MyListPage movies={movies} />
        </Route>
        <Route exact path="/films/:id">
          <MoviePage
            relatedMovies={movies.slice(0, 4)}
            id={movies[0].id}
            name={movies[0].name}
            genre={movies[0].genre}
            released={movies[0].released}
            imgSrc={movies[0].poster_image}
            rating={movies[0].rating}
            scoresCount={movies[0].scores_count}
            bgImgSrc={movies[0].background_image}
            bgColor={movies[0].background_color}
            description={movies[0].description}
            director={movies[0].director}
            starring={movies[0].starring}
            runTime={movies[0].run_time}
            isFavorite={movies[0].is_favorite}
          />
        </Route>
        <Route exact path="/films/:id/review">
          <AddReviewPage name={films[0].name} imgSrc={films[0].preview_image} />
        </Route>
        <Route exact path="/films/:id/player">
          <PlayerPage name={movies[0].name} />
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
  promoFilm: moviePropTypes.isRequired,
};

export default App;

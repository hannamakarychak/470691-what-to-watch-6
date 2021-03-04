import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './components/app/app';
import movies from './mocks/films';
import reviews from './mocks/reviews';
import {reducer} from './store/reducer';
import {createApi} from './api';
import {checkAuth} from './api-actions';
import {ActionCreator} from './store/action';
import {AuthorizationStatus} from './constants';

const api = createApi(() => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)));
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));
store.dispatch(checkAuth());

ReactDOM.render(<Provider store={store}><App movies={movies} promoFilm={movies[0]} reviews={reviews} /></Provider>, document.querySelector(`#root`));

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './components/app/app';
import movies from './mocks/films';
import reviews from './mocks/reviews';
import {reducer} from './store/reducer';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(<Provider store={store}><App movies={movies} promoFilm={movies[0]} reviews={reviews} />,</Provider>, document.querySelector(`#root`));

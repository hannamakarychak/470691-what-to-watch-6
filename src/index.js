import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';
import movies from './mocks/films';
import reviews from './mocks/reviews';

ReactDOM.render(<App movies={movies} promoFilm={movies[0]} reviews={reviews} />, document.querySelector(`#root`));

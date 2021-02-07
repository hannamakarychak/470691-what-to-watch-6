import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

const mainPageData = {
  title: `Hotel Grand Budapest`,
  genre: `Drama`,
  releaseDate: 2014
};

ReactDOM.render(<App title={mainPageData.title} genre={mainPageData.genre} releaseDate={mainPageData.releaseDate} />, document.querySelector(`#root`));

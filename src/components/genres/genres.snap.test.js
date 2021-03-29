import React from 'react';
import {render} from '@testing-library/react';

import Genres from './genres';
import {ALL_GENRES} from '../../constants';

it(`Should Genres render correctly`, () => {
  const {container} = render(
    <Genres
      genres={[ALL_GENRES, `Comedy`]}
      selectedGenre="Comedy"
      onGenreSelect={jest.fn}
    />
  );
  expect(container).toMatchSnapshot();
});

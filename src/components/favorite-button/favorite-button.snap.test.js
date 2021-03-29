import React from 'react';
import {render} from '@testing-library/react';
import FavoriteButton from './favorite-button';

describe(`Should Favorite button render correctly`, () => {
  it(`when isFavorite is true`, () => {
    const {container} = render(

      <FavoriteButton onClick={jest.fn} isFavorite={true} />

    );
    expect(container).toMatchSnapshot();
  });

  it(`when isFavorite is false`, () => {
    const {container} = render(

      <FavoriteButton onClick={jest.fn} isFavorite={false} />

    );
    expect(container).toMatchSnapshot();
  });
});

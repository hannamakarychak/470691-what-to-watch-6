import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router';

import Catalog from '../catalog/catalog';
import {NameSpace} from '../../store/reducer';
import {ALL_GENRES} from '../../constants';
import {mockMovie} from '../../store/action.test';
import {adaptMovieToClient} from '../../api-adapter';

jest.mock(`../player/player.jsx`, () => () => `PlayerComponent`);

const mockStore = configureStore({});

describe(`Should Catalog render correctly`, () => {
  it(`without load more button`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.ALL_MOVIES]: {
        list: [adaptMovieToClient(mockMovie)],
        genre: ALL_GENRES
      },
    });
    const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </redux.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it(`with load more button`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.ALL_MOVIES]: {
        list: new Array(9).fill().map((movie, i) => ({
          ...adaptMovieToClient(mockMovie),
          id: i
        })),
        genre: ALL_GENRES
      },
    });
    const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Catalog />
        </Router>
      </redux.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});

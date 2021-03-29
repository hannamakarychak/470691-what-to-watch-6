import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';

import Header from './header';
import {NameSpace} from '../../store/reducer';
import {AuthorizationStatus} from '../../constants';

const mockStore = configureStore({});


describe(`Should Header render correctly`, () => {
  it(`when isLoggedIn is true`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        email: `email@test.com`,
        avatar: `https://avatar.com/face.png`,
        isLoaded: true
      },
    });
    const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Header className="test-class">
            this is children
          </Header>
        </Router>
      </redux.Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it(`when isLoggedIn is false`, () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: null,
        avatar: null,
        isLoaded: true
      },
    });
    const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Header className="test-class">
            this is children
          </Header>
        </Router>
      </redux.Provider>
    );
    expect(container).toMatchSnapshot();
  });
  it(`when isLoggedIn is false on /login route`, () => {
    const history = createMemoryHistory();
    history.push(`/login`);
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        email: null,
        avatar: null,
        isLoaded: true
      },
    });
    const {container} = render(
      <redux.Provider store={store}>
        <Router history={history}>
          <Header className="test-class">
            this is children
          </Header>
        </Router>
      </redux.Provider>
    );
    expect(container).toMatchSnapshot();
  });
});


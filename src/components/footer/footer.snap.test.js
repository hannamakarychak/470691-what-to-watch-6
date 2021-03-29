import React from 'react';
import {render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router';

import Footer from './footer';

it(`Should Footer render correctly`, () => {
  const history = createMemoryHistory();

  const {container} = render(
    <Router history={history}>
      <Footer />
    </Router>
  );
  expect(container).toMatchSnapshot();
});

import React from 'react';
import {render} from '@testing-library/react';

import ShowMore from './show-more';

it(`Should ShowMore render correctly`, () => {
  const {container} = render(
    <ShowMore />
  );
  expect(container).toMatchSnapshot();
});

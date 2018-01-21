import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router';

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MockedProvider>
        <MemoryRouter>
          <App/>
        </MemoryRouter>
      </MockedProvider>,
      div);
  });
});

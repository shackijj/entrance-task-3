/// <reference path="./contrib/react-dates.d.ts" />
/// <reference path="./contrib/lodash.flowright.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { updateCurrentDate } from './actions';

import client from './apolloClient';
import store from './store';

import { ApolloProvider } from 'react-apollo';

import 'reset-css/reset.css';
import './index.css';
import './setupLocale';

/**
 * It's for the clock on the main page 
 */
setInterval(() => updateCurrentDate(new Date()), 1000);

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

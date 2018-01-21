/// <reference path="./contrib/react-dates.d.ts" />
/// <reference path="./contrib/lodash.flowright.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import client from './apolloClient';

import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';

import 'reset-css/reset.css';
import './index.css';
import './setupLocale';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

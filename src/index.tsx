/// <reference path="./contrib/react-dates.d.ts" />
/// <reference path="./contrib/lodash.flowright.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';

import client from './apolloClient';

import { ApolloProvider } from 'react-apollo';

import 'reset-css/reset.css';
import './index.css';
import './setupLocale';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { updateCurrentDate } from './actions';

import 'reset-css/reset.css';
import './index.css';
import './setupLocale';

const today = new Date();
const initialState = {
  dateCurrent: today,
  dateChosen: today,
};

const store = createStore(reducer, initialState);

/**
 * It's for the clock on the main page 
 */
setInterval(() => updateCurrentDate(new Date()), 1000);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';

it('renders without crashing', () => {
  const today = new Date();
  const initialState = {
    dateCurrent: today,
    dateChosen: today,
  };
  
  const store = createStore(reducer, initialState);
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    div);
});

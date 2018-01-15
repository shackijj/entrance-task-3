import { createStore } from 'redux';
import reducer from './reducers';

const today = new Date();
const initialState = {
  dateCurrent: today,
  dateChosen: today,
};

const store = createStore(reducer, initialState);

export default store;

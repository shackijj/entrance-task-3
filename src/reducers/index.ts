import { Reducer } from 'redux';
import * as types from '../constants/ActionTypes';

const initialState = {
  dateCurrent: new Date()
};

interface AppState {
  dateCurrent: Date;
}

const rootReducer: Reducer<AppState|undefined> = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENT_DATE:
      return Object.assign({}, state, {
        dateCurrent: action.dateCurrent
      });
    default:
      return state;
  }
}; 

export default rootReducer;
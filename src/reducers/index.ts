import { Reducer } from 'redux';
import * as types from '../constants/ActionTypes';

interface AppState {
  dateCurrent: Date;
}

const rootReducer: Reducer<AppState> = (state, action) => {
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
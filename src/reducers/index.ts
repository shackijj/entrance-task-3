import { Reducer } from 'redux';
import * as types from '../constants/ActionTypes';

export interface AppState {
  dateCurrent: Date;
  dateChosen: Date;
}

const rootReducer: Reducer<AppState> = (state, action) => {
  switch (action.type) {
    case types.UPDATE_CURRENT_DATE:
      return Object.assign({}, state, {
        dateCurrent: action.date
      });
    case types.CHOOSE_DATE:
      return Object.assign({}, state, {
        dateChosen: action.date
      });
    default:
      return state;
  }
}; 

export default rootReducer;
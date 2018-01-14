import * as types from '../constants/ActionTypes';

export const updateCurrentDate = (date: Date) => ({
  type: types.UPDATE_CURRENT_DATE,
  date
});
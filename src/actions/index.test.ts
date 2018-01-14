import * as actions from './index';
import * as types from '../constants/ActionTypes';

describe('#updateCurrentDate', () => {
  it('should update current date', () => {
    const date = new Date();
    expect(actions.updateCurrentDate(date)).toEqual({
      date,
      type: types.UPDATE_CURRENT_DATE
    });
  });
});
import rootReducer from './index';
import * as actions from '../actions';

describe('rootReducer', () => {
  it('should return initial state with date', () => {
    const state = { dateCurrent: new Date(), dateChosen: new Date() };
    const actual = rootReducer(state, {type: 'Nonsense'});
    expect(actual).toEqual(state);
  });
  
  it('should update dateCurrent', () => {
    const dateCurrent = new Date('2018-01-15');
    const dateChosen = new Date('2018-01-15');
    const date = new Date('2018-01-15');
    const state = { dateCurrent, dateChosen };

    const newState = rootReducer(state, actions.updateCurrentDate(date));
    expect(newState.dateCurrent).toEqual(date);
    expect(newState.dateChosen).toEqual(dateChosen);
  });

  it('should update dateChosen', () => {
    const dateCurrent = new Date('2018-01-15');
    const dateChosen = new Date('2018-01-15');
    const date = new Date('2018-01-16');
    const state = { dateCurrent, dateChosen };

    const newState = rootReducer(state, actions.chooseDate(date));
    expect(newState.dateCurrent).toEqual(dateCurrent);
    expect(newState.dateChosen).toEqual(date);
  });
});
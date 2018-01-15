import rootReducer from './index';

describe('rootReducer', () => {
  it('should return initial state with date', () => {
    const state = { dateCurrent: new Date() };
    const actual = rootReducer(state, {type: 'Nonsense'});
    expect(actual).toEqual(state);
  });  
});
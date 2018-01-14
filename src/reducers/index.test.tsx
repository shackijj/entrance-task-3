import rootReducer from './index';

describe('rootReducer', () => {
  it('should return initial state with date', () => {
    const actual = rootReducer(undefined, {type: 'Nonsense'});
    expect(actual && actual.dateCurrent).toBeInstanceOf(Date);
  });  
});
import * as React from 'react';
import UserInput from './UserInput';
import shallowExpect from '../utils/shallowExpect';
import { mount } from 'enzyme';

describe('UserInput', () => {
  it('should match snapshpt', () => {
    shallowExpect(<UserInput login="asd" avatarUrl="qwe"/>).toMatchSnapshot();
  });
  it('should fire onCloseClick', () => {
    const mock = jest.fn();
    const wrapper = mount(<UserInput login="asd" avatarUrl="qwe" onCloseClick={mock}/>);
    expect(mock).toHaveBeenCalledTimes(0);
    wrapper.find('.UserInput-Close').simulate('click');
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
import * as React from 'react';
import UsersInput from './UsersInput';
import { mount } from 'enzyme';

describe('UsersInput', () => {
  it('should have input element inside', () => {
    const wrapper = mount(<UsersInput usersHint={[]}/>);
    expect(wrapper.find('div > input')).toHaveLength(1);
  });

  it('should show a hint containing users when the input is focused and usersHints is given', () => {
    const wrapper = mount(
    <UsersInput
      usersHint={
        [
          {
            id: '1',
            firstName: 'Test',
            secondName: 'Second',
            floor: 1,
            avatarUrl: 'http://s.x',
          }
        ]
      }
    />);

    expect(wrapper.find('.UserInput-Hints')).toHaveLength(0);
    wrapper.find('div > input').simulate('focus');
    expect(wrapper.find('.UserInput-Hints')).toHaveLength(1);
  });

  it('hide the hint when the input is blured', () => {
    const wrapper = mount(
      <UsersInput
        usersHint={
          [
            {
              id: '1',
              firstName: 'Test',
              secondName: 'Second',
              floor: 1,
              avatarUrl: 'http://s.x',
            }
          ]
        }
      />);
  
    expect(wrapper.find('.UserInput-Hints')).toHaveLength(0);
    wrapper.find('div > input').simulate('focus');
    expect(wrapper.find('.UserInput-Hints')).toHaveLength(1);
    wrapper.find('div > input').simulate('blur');
    expect(wrapper.find('.UserInput-Hints')).toHaveLength(0);
  });

  it('should add user to users list when hint is clicked and clear the input');

  it('should remove a user from the list when the user\'s close button is clicked');
});

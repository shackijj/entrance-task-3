import * as React from 'react';
import UsersInput from './UsersInput';
import { mount } from 'enzyme';

describe('UsersInput', () => {
  it('should have input element inside', () => {
    const wrapper = mount(<UsersInput usersHint={[]} users={[]}/>);
    expect(wrapper.find('div > input')).toHaveLength(1);
  });

  it('should show a hint containing users when the input is focused and usersHints is given', () => {
    const wrapper = mount(
    <UsersInput
      users={[]}
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
        users={[]}
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

  it('should fire onUserAdd when hint is clicked and clear the input', () => {
    const mock = jest.fn();
    const wrapper = mount(
      <UsersInput
        onUserAdd={mock}
        users={[]}
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

    const inputSelector = 'div > input';
    const input = wrapper.find(inputSelector);
    input.simulate('focus');
    input.simulate('change', {target: {value: 'Test Value'}});
    const node = input.getDOMNode() as HTMLInputElement;
    expect(node.value).toEqual('Test Value');

    const hintUser = wrapper.find('.UsersHint-User').first();
    expect(mock).toHaveBeenCalledTimes(0);
    hintUser.simulate('click');
    expect(mock).toHaveBeenCalledTimes(1);

    expect(mock).toHaveBeenCalledWith('1');
    expect(node.value).toEqual('');
   });

  it('should render userInputs when users is given and fire onUserRemove when user\'s close button is clicked', () => {
    const mock = jest.fn();
    const wrapper = mount(
      <UsersInput
        usersHint={[]}
        onUserRemove={mock}
        users={
          [
            {
              id: '1',
              firstName: 'Test',
              secondName: 'Second',
              avatarUrl: 'http://s.x',
              floor: 1,
            },
            {
              id: '2',
              firstName: 'Test',
              secondName: 'Second',
              avatarUrl: 'http://s.x',
              floor: 1,
            }
          ]
        }
      />);

    expect(wrapper.find('.UserInput')).toHaveLength(2);
    
    expect(mock).toHaveBeenCalledTimes(0);
    wrapper.find('.UserInput-Close').first().simulate('click');
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith('1');
  });
});

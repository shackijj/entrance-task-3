import * as React from 'react';
import UsersInputWithGQL, { UsersInput, USERS_QUERY } from './UsersInput';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

describe('UsersInput', () => {
  it('should have input element inside', () => {
    const wrapper = mount(<UsersInput inputValue="" usersHint={[]} users={[]}/>);
    expect(wrapper.find('div > input')).toHaveLength(1);
  });

  it('should show a hint containing users when the input is focused and usersHints is given', () => {
    const wrapper = mount(
    <UsersInput
      inputValue=""
      users={[]}
      usersHint={
        [
          {
            id: '1',
            firstName: 'Test',
            secondName: 'Second',
            floor: {
              floor: 1
            },
            avatarUrl: 'http://s.x',
          }
        ]
      }
    />);

    expect(wrapper.find('.UserInput-Hints')).toHaveLength(0);
    wrapper.find('div > input').simulate('focus');
    expect(wrapper.find('.UserInput-Hints')).toHaveLength(1);
  });

  it('should fire onUserAdd when hint is clicked and clear the input', () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const wrapper = mount(
      <UsersInput
        inputValue="Test Value"
        onUserAdd={mock1}
        onInputChange={mock2}
        users={[]}
        usersHint={
          [
            {
              id: '1',
              firstName: 'Test',
              secondName: 'Second',
              floor: {
                floor: 1
              },
              avatarUrl: 'http://s.x',
            }
          ]
        }
      />);

    const inputSelector = 'div > input';
    const input = wrapper.find(inputSelector);
    input.simulate('focus');
    input.simulate('change', {target: {value: 'Test Value'}});
    expect(mock2).toHaveBeenCalledWith('Test Value');

    const hintUser = wrapper.find('.UsersHint-User').first();
    expect(mock1).toHaveBeenCalledTimes(0);
    hintUser.simulate('click');
    expect(mock1).toHaveBeenCalledTimes(1);

    expect(mock1).toHaveBeenCalledWith({
      id: '1',
      firstName: 'Test',
      secondName: 'Second',
      floor: {
        floor: 1
      },
      avatarUrl: 'http://s.x',
    });
   });

  it('should render userInputs when users is given and fire onUserRemove when user\'s close button is clicked', () => {
    const mock = jest.fn();
    const wrapper = mount(
      <UsersInput
        inputValue=""
        usersHint={[]}
        onUserRemove={mock}
        users={
          [
            {
              id: '1',
              firstName: 'Test',
              secondName: 'Second',
              avatarUrl: 'http://s.x',
              floor: {
                floor: 1
              },
            },
            {
              id: '2',
              firstName: 'Test',
              secondName: 'Second',
              avatarUrl: 'http://s.x',
              floor: {
                floor: 1
              },
            }
          ]
        }
      />);

    expect(wrapper.find('.UserInput')).toHaveLength(2);
    
    expect(mock).toHaveBeenCalledTimes(0);
    wrapper.find('.UserInput-Close').first().simulate('click');
    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({
      id: '1',
      firstName: 'Test',
      secondName: 'Second',
      avatarUrl: 'http://s.x',
      floor: {
        floor: 1
      },
    });
  });
});

describe('UsersInputWithGQL', () => {
  it('it should show users when request is succeful', () => {
    const mocks = [
      {
        request: {
          query: USERS_QUERY,
          variables: { nameContains: 'Test' }
        },
        result: {
  
          data: {
            users: [
              {
                id: '2',
                firstName: 'Test',
                secondName: 'Second',
                avatarUrl: 'http://s.x',
                floor: {
                  floor: 1,
                  __typename: 'Floor',
                },
                __typename: 'User',
              }
            ]
          }
        }
      }
    ];
  
    const wrapper = mount(
      <MockedProvider mocks={mocks} removeTypename={true}>
        <UsersInputWithGQL
          users={[]}
          inputValue="Test"
        />
      </MockedProvider>
    );
  
    const promise = new Promise((resolve, reject) => {
      setTimeout(
        () => {
          wrapper.find('.UsersInput-Input input').simulate('focus');
          resolve(wrapper.find('.UserInput-Hints'));
        },
        10);
    });
  
    return expect(promise).resolves.toHaveLength(1);
  });
});
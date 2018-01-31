import * as React from 'react';
import UsersHint from './UsersHint';
import shallowExpect from '../utils/shallowExpect';
import { shallow } from 'enzyme';

describe('UsersHint', () => {
  it('should show a list of users', () => {
    const users = [
      {
        firstName: 'Артур',
        secondName: 'Пирожков',
        id: '1',
        floor: {
          floor: 1
        },
        avatarUrl: 'https://somewhere.ru'
      },
      {
        firstName: 'Артур',
        secondName: 'Пирожков',
        id: '2',
        floor: {
          floor: 1
        },
        avatarUrl: 'https://somewhere.ru'
      }
    ];
    shallowExpect(<UsersHint users={users}/>).toMatchSnapshot();
  });

  it('should fire onUserClick when a user is clicked', () => {
    const mock = jest.fn();
    const users = [
      {
        firstName: 'Артур',
        secondName: 'Пирожков',
        id: '1',
        floor: {
          floor: 1
        },
        avatarUrl: 'https://somewhere.ru'
      },
      {
        firstName: 'Артур',
        secondName: 'Пирожков',
        id: '2',
        floor: {
          floor: 1
        },
        avatarUrl: 'https://somewhere.ru'
      }
    ];
    const wrapper = shallow(<UsersHint users={users} onUserClick={mock}/>);
    const usersElements = wrapper.find('.UsersHint-User');
    shallow(usersElements.get(1)).simulate('click');

    expect(mock).toHaveBeenCalledTimes(1);
    expect(mock).toHaveBeenCalledWith({
      firstName: 'Артур',
      secondName: 'Пирожков',
      id: '2',
      floor: {
        floor: 1
      },
      avatarUrl: 'https://somewhere.ru'
    });
  });
});

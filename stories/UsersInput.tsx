import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { UsersInput } from '../src/components/UsersInput';

const avatarUrl = 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg';

storiesOf('UsersInput', module)
  .add('with users', () => {
    const users = [
      {
        id: '1',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '2',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      }
    ];
    return <UsersInput users={users} usersHint={[]}/>;
  })
  .add('with users hints', () => {
    const usersHints = [
      {
        id: '1',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '2',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
    ];
    return <UsersInput usersHint={usersHints} users={[]}/>;
  })
  .add('with users hints and users', () => {
    const usersHints = [
      {
        id: '1',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '2',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '1',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '2',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '1',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '2',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '1',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      },
      {
        id: '2',
        firstName: 'Test',
        secondName: 'Second',
        avatarUrl,
        floor: 1,
      }
    ];
    return <UsersInput usersHint={usersHints} users={usersHints}/>;
  });
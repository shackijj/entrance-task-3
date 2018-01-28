import * as React from 'react';
import { storiesOf } from '@storybook/react';
import UsersHint from '../src/components/UsersHint';

const avatarUrl = 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg';

storiesOf('UsersHint', module)
  .add('default', () => {
    const users = [
      {
        firstName: 'Артур',
        secondName: 'Пирожков',
        id: '1',
        floor: 1,
        avatarUrl,
      },
      {
        firstName: 'Артур',
        secondName: 'Пирожков',
        id: '2',
        floor: 1,
        avatarUrl,
      }
    ];
    return <UsersHint users={users}/>;
  });
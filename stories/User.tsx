import * as React from 'react';
import { storiesOf } from '@storybook/react';
import User from '../src/components/User';

storiesOf('User', module)
  .add('default', () => (
    <div>
      {<User
        name="Артур Пирожков"
        avatarUrl="https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg"
      />}
    </div>));
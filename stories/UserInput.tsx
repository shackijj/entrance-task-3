import * as React from 'react';
import { storiesOf } from '@storybook/react';
import UserInput from '../src/components/UserInput';

storiesOf('UserInput', module)
  .add('default', () => (
  <UserInput
    name="Артур Пирожков"
    avatarUrl="https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg"
  />));
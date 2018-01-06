import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MainPage from '../src/components/MainPage';

storiesOf('MainPage', module)
  .add('whole page', () => <MainPage/>);
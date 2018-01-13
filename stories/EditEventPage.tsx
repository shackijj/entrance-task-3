import * as React from 'react';
import EditEventPage from '../src/components/EditEventPage';
import { storiesOf } from '@storybook/react';

storiesOf('EditEventPage', module)
  .add('default', () => (
      <EditEventPage/>));
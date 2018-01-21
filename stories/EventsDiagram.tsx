import * as React from 'react';
import EventsDiagram from '../src/components/EventsDiagram';
import { storiesOf } from '@storybook/react';

storiesOf('EventsDiagram', module)
  .add('default', () => (
      <EventsDiagram/>));
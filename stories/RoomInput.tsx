import * as React from 'react';
import { storiesOf } from '@storybook/react';
import RoomInput from '../src/components/RoomInput';

storiesOf('RoomInput', module)
  .add('default', () => (
    <RoomInput
      dateStart={new Date('2018-01-13T15:24:49.265')}
      dateEnd={new Date('2018-01-13T15:34:49.265')}
      room={{
        title: 'Оранжевый рассвет',
        floor: 4,
      }}
    />
  ))
  .add('active', () => (
    <RoomInput
      dateStart={new Date('2018-01-13T15:24:49.265')}
      dateEnd={new Date('2018-01-13T15:34:49.265')}
      isActive={true}
      room={{
        title: 'Оранжевый рассвет',
        floor: 4,
      }}
    />
  ));
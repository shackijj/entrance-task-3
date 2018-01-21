import * as React from 'react';
import { storiesOf } from '@storybook/react';
import RoomGroupList from '../src/components/RoomGroupList';
import Room from '../src/components/Room';

const roomGroups = [
  {
    floor: 7,
    rooms: [
      {
        title: 'Ржавый Фред',
        capacity: 3,
      },
      {
        title: 'Прачечная',
        capacity: 3,
        isHovered: true
      },
      {
        title: 'Желтый дом',
        capacity: 3,
        isDisabled: true
      },
      {
        title: 'Оранжевый Тюльпан',
        capacity: 3,
        isPressed: true
      },
    ]
  }
];

storiesOf('RoomGroupList', module)
  .add('with room conditions', () => (
    <RoomGroupList groups={roomGroups} RoomComponent={Room}/>));
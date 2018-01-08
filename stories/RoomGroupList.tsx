import * as React from 'react';
import { storiesOf } from '@storybook/react';
import RoomGroupList from '../src/components/RoomGroupList';

const roomGroups = [
  {
    title: '7 этаж',
    rooms: [
      {
        title: 'Ржавый Фред',
        description: '3 - 6 человек',
      },
      {
        title: 'Прачечная',
        description: 'до 10 человек',
        isHovered: true
      },
      {
        title: 'Желтый дом',
        description: 'до 10 человек',
        isDisabled: true
      },
      {
        title: 'Оранжевый Тюльпан',
        description: 'до 10 человек',
        isPressed: true
      },
    ]
  }
];

storiesOf('RoomGroupList', module)
  .add('with room conditions', () => (<RoomGroupList groups={roomGroups}/>));
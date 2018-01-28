import * as React from 'react';
import EventsDiagram from '../src/components/EventsDiagram';
import { storiesOf } from '@storybook/react';
import './EventDiagram.css';

const floor = [
  {
    floor: 7,
    rooms: [
      {
        id: '1',
        title: 'Ржавый Фред',
        capacity: 7,
        events: [
          {
            id: '1',
            title: 'Событие 1',
            dateStart: '2018-01-09T08:30:00.55',
            dateEnd: '2018-01-09T08:45:00.55',
            users: [],
          },
        ]
      }
    ]
  }
];

storiesOf('EventsDiagram', module)
  .add('default', () => (
      <EventsDiagram
        floors={floor}
        classes={['EventDiagram-Story']}
        isDateCurrent={false}
        date={'2018-01-09T18:30:00.55'}
      />
  ));

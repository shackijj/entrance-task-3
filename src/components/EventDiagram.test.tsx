import * as React from 'react';
import EventsDiagram from './EventsDiagram';
import shallowExpect from '../utils/shallowExpect';

describe('EventDiagram', () => {
  it('should render a floors list', () => {
    const floor = [
      {
        floor: 7,
        rooms: [
          {
            title: 'Ржавый Фред',
            capacity: 7,
            events: [
              {
                title: 'Событие 1',
                dateStart: '2018-01-09T06:30:00.55',
                dateEnd: '2018-01-09T08:45:00.55',
                users: [],
              },
              {
                title: 'Событие 2',
                dateStart: '2018-01-09T09:30:00.55',
                dateEnd: '2018-01-09T11:45:00.55',
                users: [],
              },
              {
                title: 'Событие 3',
                dateStart: '2018-01-09T18:30:00.55',
                dateEnd: '2018-01-09T20:45:00.55',
                users: [],
              }
            ]
          }
        ]
      }
    ];
    shallowExpect(
      <EventsDiagram
        floors={floor}
        classes={['EventDiagram-Story']}
      />)
      .toMatchSnapshot();
  });
});
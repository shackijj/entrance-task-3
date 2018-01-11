import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MainPage from '../src/components/MainPage';

const roomGroups = [
  {
    title: '7 этаж',
    rooms: [
      {
        title: 'Ржавый Фред',
        description: '3 - 6 человек',
        events: [
          {
            title: 'Событие 1',
            dateStart: new Date('2018-01-09T06:30:00.55'),
            dateEnd: new Date('2018-01-09T08:45:00.55')
          },
          {
            title: 'Событие 2',
            dateStart: new Date('2018-01-09T09:30:00.55'),
            dateEnd: new Date('2018-01-09T11:45:00.55')
          },
          {
            title: 'Событие 3',
            dateStart: new Date('2018-01-09T18:30:00.55'),
            dateEnd: new Date('2018-01-09T20:45:00.55')
          }
        ]
      },
      {
        title: 'Прачечная',
        description: 'до 10 человек',
        events: [
          {
            title: 'Событие 3',
            dateStart: new Date('2018-01-09T05:04:00.55'),
            dateEnd: new Date('2018-01-09T10:00:00.55')
          },
          {
            title: 'Событие 4',
            dateStart: new Date('2018-01-09T14:10:00.55'),
            dateEnd: new Date('2018-01-09T14:45:00.55')
          },
          {
            title: 'Событие 5',
            dateStart: new Date('2018-01-09T17:00:00.55'),
            dateEnd: new Date('2018-01-09T18:45:00.55')
          }
        ]
      },
      {
        title: 'Желтый дом',
        description: 'до 10 человек',
        events: []
      },
      {
        title: 'Оранжевый Тюльпан',
        description: 'до 10 человек',
        events: [
          {
            title: 'Событие 7',
            dateStart: new Date('2018-01-09T10:04:00.55'),
            dateEnd: new Date('2018-01-09T13:00:00.55')
          },
          {
            title: 'Событие 9',
            dateStart: new Date('2018-01-09T15:00:00.55'),
            dateEnd: new Date('2018-01-09T16:15:00.55')
          },
          {
            title: 'Событие 8',
            dateStart: new Date('2018-01-09T20:00:00.55'),
            dateEnd: new Date('2018-01-09T21:00:00.55')
          },
        ]
      },
    ]
  },
  {
    title: '6 этаж',
    rooms: [
      {
        title: 'Джокер',
        description: '3 - 6 человек',
        events: []
      },
      {
        title: 'Мариванна',
        description: '3 - 6 человек',
        events: [
          {
            title: 'Событие 7',
            dateStart: new Date('2018-01-09T10:04:00.55'),
            dateEnd: new Date('2018-01-09T13::00.55')
          },
          {
            title: 'Событие 8',
            dateStart: new Date('2018-01-09T20:00.55'),
            dateEnd: new Date('2018-01-09T21:00:00.55')
          },
          {
            title: 'Событие 9',
            dateStart: new Date('2018-01-09T15:00:00.55'),
            dateEnd: new Date('2018-01-09T16:15:00.55')
          }
        ]
      },
      {
        title: 'Тонкий боб',
        description: '3 - 6 человек',
        events: [
          {
            title: 'Событие 1',
            dateStart: new Date('2018-01-09T06:30:00.55'),
            dateEnd: new Date('2018-01-09T08:45:00.55')
          },
          {
            title: 'Событие 2',
            dateStart: new Date('2018-01-09T09:30:00.55'),
            dateEnd: new Date('2018-01-09T11:45:00.55')
          },
          {
            title: 'Событие 3',
            dateStart: new Date('2018-01-09T18:30:00.55'),
            dateEnd: new Date('2018-01-09T20:45:00.55')
          }
        ]
      },
      {
        title: 'Черная вдова',
        description: '3 - 6 человек',
        events: [],
      },
      {
        title: 'Белорусский ликёр',
        description: '3 - 6 человек',
        events: []
      },
    ]
  },
  {
    title: '7 этаж',
    rooms: [
      {
        title: 'Ржавый Фред',
        description: '3 - 6 человек',
        events: [
          {
            title: 'Событие 1',
            dateStart: new Date('2018-01-09T06:30:00.55'),
            dateEnd: new Date('2018-01-09T08:45:00.55')
          },
          {
            title: 'Событие 2',
            dateStart: new Date('2018-01-09T09:30:00.55'),
            dateEnd: new Date('2018-01-09T11:45:00.55')
          },
          {
            title: 'Событие 3',
            dateStart: new Date('2018-01-09T18:30:00.55'),
            dateEnd: new Date('2018-01-09T20:45:00.55')
          }
        ]
      },
      {
        title: 'Прачечная',
        description: 'до 10 человек',
        events: [
          {
            title: 'Событие 3',
            dateStart: new Date('2018-01-09T05:04:00.55'),
            dateEnd: new Date('2018-01-09T10:00:00.55')
          },
          {
            title: 'Событие 4',
            dateStart: new Date('2018-01-09T14:10:00.55'),
            dateEnd: new Date('2018-01-09T14:45:00.55')
          },
          {
            title: 'Событие 5',
            dateStart: new Date('2018-01-09T17:00:00.55'),
            dateEnd: new Date('2018-01-09T18:45:00.55')
          }
        ]
      },
      {
        title: 'Желтый дом',
        description: 'до 10 человек',
        events: []
      },
      {
        title: 'Оранжевый Тюльпан',
        description: 'до 10 человек',
        events: [
          {
            title: 'Событие 7',
            dateStart: new Date('2018-01-09T10:04:00.55'),
            dateEnd: new Date('2018-01-09T13:00:00.55')
          },
          {
            title: 'Событие 9',
            dateStart: new Date('2018-01-09T15:00:00.55'),
            dateEnd: new Date('2018-01-09T16:15:00.55')
          },
          {
            title: 'Событие 8',
            dateStart: new Date('2018-01-09T20:00:00.55'),
            dateEnd: new Date('2018-01-09T21:00:00.55')
          },
        ]
      },
    ]
  },
  {
    title: '6 этаж',
    rooms: [
      {
        title: 'Джокер',
        description: '3 - 6 человек',
        events: []
      },
      {
        title: 'Мариванна',
        description: '3 - 6 человек',
        events: [
          {
            title: 'Событие 7',
            dateStart: new Date('2018-01-09T10:04:00.55'),
            dateEnd: new Date('2018-01-09T13::00.55')
          },
          {
            title: 'Событие 8',
            dateStart: new Date('2018-01-09T20:00.55'),
            dateEnd: new Date('2018-01-09T21:00:00.55')
          },
          {
            title: 'Событие 9',
            dateStart: new Date('2018-01-09T15:00:00.55'),
            dateEnd: new Date('2018-01-09T16:15:00.55')
          }
        ]
      },
      {
        title: 'Тонкий боб',
        description: '3 - 6 человек',
        events: [
          {
            title: 'Событие 1',
            dateStart: new Date('2018-01-09T06:30:00.55'),
            dateEnd: new Date('2018-01-09T08:45:00.55')
          },
          {
            title: 'Событие 2',
            dateStart: new Date('2018-01-09T09:30:00.55'),
            dateEnd: new Date('2018-01-09T11:45:00.55')
          },
          {
            title: 'Событие 3',
            dateStart: new Date('2018-01-09T18:30:00.55'),
            dateEnd: new Date('2018-01-09T20:45:00.55')
          }
        ]
      },
      {
        title: 'Черная вдова',
        description: '3 - 6 человек',
        events: [],
      },
      {
        title: 'Белорусский ликёр',
        description: '3 - 6 человек',
        events: []
      },
    ]
  },
];

storiesOf('MainPage', module)
  .add('whole page', () => (
    <MainPage
      formattedDate="14 дек · Сегодня"
      roomGroups={roomGroups}
      hourStart={7}
      hourEnd={23}
      currentTime={new Date('2018-01-09T07:30:00.55')}
    />));
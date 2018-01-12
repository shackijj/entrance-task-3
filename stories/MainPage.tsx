import * as React from 'react';
import { storiesOf } from '@storybook/react';
import MainPage from '../src/components/MainPage';
const users = [
  {
    name: 'Дарт Вейдер 1',
    avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
  },
  {
    name: 'Дарт Вейдер 2',
    avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
  },
  {
    name: 'Дарт Вейдер 3',
    avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
  }
];

const aFewGroups = [
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
            dateEnd: new Date('2018-01-09T08:45:00.55'),
            users
          },
          {
            title: 'Событие 2',
            dateStart: new Date('2018-01-09T09:30:00.55'),
            dateEnd: new Date('2018-01-09T11:45:00.55'),
            users
          },
          {
            title: 'Событие 3',
            dateStart: new Date('2018-01-09T18:30:00.55'),
            dateEnd: new Date('2018-01-09T20:45:00.55'),
            users
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
            dateEnd: new Date('2018-01-09T10:04:00.55'),
            users
          },
          {
            title: 'Событие 4',
            dateStart: new Date('2018-01-09T14:10:00.55'),
            dateEnd: new Date('2018-01-09T14:45:00.55'),
            users
          },
          {
            title: 'Событие 5',
            dateStart: new Date('2018-01-09T17:00:00.55'),
            dateEnd: new Date('2018-01-09T18:45:00.55'),
            users
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
            dateStart: new Date('2018-01-09T10:15:00.55'),
            dateEnd: new Date('2018-01-09T13:00:00.55'),
            users
          },
          {
            title: 'Событие 9',
            dateStart: new Date('2018-01-09T15:00:00.55'),
            dateEnd: new Date('2018-01-09T16:15:00.55'),
            users
          },
          {
            title: 'Событие 8',
            dateStart: new Date('2018-01-09T20:00:00.55'),
            dateEnd: new Date('2018-01-09T21:00:00.55'),
            users
          },
        ]
      },
    ]
  },
];

storiesOf('MainPage', module)
  .add('with lots of rooms', () => {
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
                dateEnd: new Date('2018-01-09T08:45:00.55'),
                users
              },
              {
                title: 'Событие 2',
                dateStart: new Date('2018-01-09T09:30:00.55'),
                dateEnd: new Date('2018-01-09T11:45:00.55'),
                users
              },
              {
                title: 'Событие 3',
                dateStart: new Date('2018-01-09T18:30:00.55'),
                dateEnd: new Date('2018-01-09T20:45:00.55'),
                users
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
                dateEnd: new Date('2018-01-09T10:04:00.55'),
                users
              },
              {
                title: 'Событие 4',
                dateStart: new Date('2018-01-09T14:10:00.55'),
                dateEnd: new Date('2018-01-09T14:45:00.55'),
                users
              },
              {
                title: 'Событие 5',
                dateStart: new Date('2018-01-09T17:00:00.55'),
                dateEnd: new Date('2018-01-09T18:45:00.55'),
                users
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
                dateStart: new Date('2018-01-09T10:15:00.55'),
                dateEnd: new Date('2018-01-09T13:00:00.55'),
                users
              },
              {
                title: 'Событие 9',
                dateStart: new Date('2018-01-09T15:00:00.55'),
                dateEnd: new Date('2018-01-09T16:15:00.55'),
                users
              },
              {
                title: 'Событие 8',
                dateStart: new Date('2018-01-09T20:00:00.55'),
                dateEnd: new Date('2018-01-09T21:00:00.55'),
                users
              },
            ]
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
                dateEnd: new Date('2018-01-09T08:45:00.55'),
                users
              },
              {
                title: 'Событие 2',
                dateStart: new Date('2018-01-09T09:30:00.55'),
                dateEnd: new Date('2018-01-09T11:45:00.55'),
                users
              },
              {
                title: 'Событие 3',
                dateStart: new Date('2018-01-09T18:30:00.55'),
                dateEnd: new Date('2018-01-09T20:45:00.55'),
                users
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
                dateEnd: new Date('2018-01-09T10:04:00.55'),
                users
              },
              {
                title: 'Событие 4',
                dateStart: new Date('2018-01-09T14:10:00.55'),
                dateEnd: new Date('2018-01-09T14:45:00.55'),
                users
              },
              {
                title: 'Событие 5',
                dateStart: new Date('2018-01-09T17:00:00.55'),
                dateEnd: new Date('2018-01-09T18:45:00.55'),
                users
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
                dateStart: new Date('2018-01-09T10:15:00.55'),
                dateEnd: new Date('2018-01-09T13:00:00.55'),
                users
              },
              {
                title: 'Событие 9',
                dateStart: new Date('2018-01-09T15:00:00.55'),
                dateEnd: new Date('2018-01-09T16:15:00.55'),
                users
              },
              {
                title: 'Событие 8',
                dateStart: new Date('2018-01-09T20:00:00.55'),
                dateEnd: new Date('2018-01-09T21:00:00.55'),
                users
              },
            ]
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
                dateEnd: new Date('2018-01-09T08:45:00.55'),
                users
              },
              {
                title: 'Событие 2',
                dateStart: new Date('2018-01-09T09:30:00.55'),
                dateEnd: new Date('2018-01-09T11:45:00.55'),
                users
              },
              {
                title: 'Событие 3',
                dateStart: new Date('2018-01-09T18:30:00.55'),
                dateEnd: new Date('2018-01-09T20:45:00.55'),
                users
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
                dateEnd: new Date('2018-01-09T10:04:00.55'),
                users
              },
              {
                title: 'Событие 4',
                dateStart: new Date('2018-01-09T14:10:00.55'),
                dateEnd: new Date('2018-01-09T14:45:00.55'),
                users
              },
              {
                title: 'Событие 5',
                dateStart: new Date('2018-01-09T17:00:00.55'),
                dateEnd: new Date('2018-01-09T18:45:00.55'),
                users
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
                dateStart: new Date('2018-01-09T10:15:00.55'),
                dateEnd: new Date('2018-01-09T13:00:00.55'),
                users
              },
              {
                title: 'Событие 9',
                dateStart: new Date('2018-01-09T15:00:00.55'),
                dateEnd: new Date('2018-01-09T16:15:00.55'),
                users
              },
              {
                title: 'Событие 8',
                dateStart: new Date('2018-01-09T20:00:00.55'),
                dateEnd: new Date('2018-01-09T21:00:00.55'),
                users
              },
            ]
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
                dateEnd: new Date('2018-01-09T08:45:00.55'),
                users
              },
              {
                title: 'Событие 2',
                dateStart: new Date('2018-01-09T09:30:00.55'),
                dateEnd: new Date('2018-01-09T11:45:00.55'),
                users
              },
              {
                title: 'Событие 3',
                dateStart: new Date('2018-01-09T18:30:00.55'),
                dateEnd: new Date('2018-01-09T20:45:00.55'),
                users
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
                dateEnd: new Date('2018-01-09T10:04:00.55'),
                users
              },
              {
                title: 'Событие 4',
                dateStart: new Date('2018-01-09T14:10:00.55'),
                dateEnd: new Date('2018-01-09T14:45:00.55'),
                users
              },
              {
                title: 'Событие 5',
                dateStart: new Date('2018-01-09T17:00:00.55'),
                dateEnd: new Date('2018-01-09T18:45:00.55'),
                users
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
                dateStart: new Date('2018-01-09T10:15:00.55'),
                dateEnd: new Date('2018-01-09T13:00:00.55'),
                users
              },
              {
                title: 'Событие 9',
                dateStart: new Date('2018-01-09T15:00:00.55'),
                dateEnd: new Date('2018-01-09T16:15:00.55'),
                users
              },
              {
                title: 'Событие 8',
                dateStart: new Date('2018-01-09T20:00:00.55'),
                dateEnd: new Date('2018-01-09T21:00:00.55'),
                users
              },
            ]
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
                dateEnd: new Date('2018-01-09T08:45:00.55'),
                users
              },
              {
                title: 'Событие 2',
                dateStart: new Date('2018-01-09T09:30:00.55'),
                dateEnd: new Date('2018-01-09T11:45:00.55'),
                users
              },
              {
                title: 'Событие 3',
                dateStart: new Date('2018-01-09T18:30:00.55'),
                dateEnd: new Date('2018-01-09T20:45:00.55'),
                users
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
                dateEnd: new Date('2018-01-09T10:04:00.55'),
                users
              },
              {
                title: 'Событие 4',
                dateStart: new Date('2018-01-09T14:10:00.55'),
                dateEnd: new Date('2018-01-09T14:45:00.55'),
                users
              },
              {
                title: 'Событие 5',
                dateStart: new Date('2018-01-09T17:00:00.55'),
                dateEnd: new Date('2018-01-09T18:45:00.55'),
                users
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
                dateStart: new Date('2018-01-09T10:15:00.55'),
                dateEnd: new Date('2018-01-09T13:00:00.55'),
                users
              },
              {
                title: 'Событие 9',
                dateStart: new Date('2018-01-09T15:00:00.55'),
                dateEnd: new Date('2018-01-09T16:15:00.55'),
                users
              },
              {
                title: 'Событие 8',
                dateStart: new Date('2018-01-09T20:00:00.55'),
                dateEnd: new Date('2018-01-09T21:00:00.55'),
                users
              },
            ]
          },

        ]
      },
    ];
    return (
      <MainPage
        formattedDate="14 дек · Сегодня"
        roomGroups={roomGroups}
        hourStart={7}
        hourEnd={23}
        showCalendar={false}
        currentTime={new Date('2018-01-09T07:30:00.55')}
      />
    );
  });

storiesOf('MainPage', module)
  .add('A few rooms', () => {
    return (
      <MainPage
        formattedDate="14 дек · Сегодня"
        roomGroups={aFewGroups}
        showCalendar={false}
        hourStart={7}
        hourEnd={23}
        currentTime={new Date('2018-01-09T07:30:00.55')}
      />
    );
  });

storiesOf('MainPage', module)
  .add('Widt datepicker opened', () => {
    return (
      <MainPage
        formattedDate="14 дек · Сегодня"
        roomGroups={aFewGroups}
        showCalendar={true}
        hourStart={7}
        hourEnd={23}
        currentTime={new Date('2018-01-09T07:30:00.55')}
      />
    );
  });
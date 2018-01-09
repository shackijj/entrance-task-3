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
      },
      {
        title: 'Прачечная',
        description: 'до 10 человек',
      },
      {
        title: 'Желтый дом',
        description: 'до 10 человек',
      },
      {
        title: 'Оранжевый Тюльпан',
        description: 'до 10 человек',
      },
    ]
  },
  {
    title: '7 этаж',
    rooms: [
      {
        title: 'Джокер',
        description: '3 - 6 человек',
      },
      {
        title: 'Мариванна',
        description: '3 - 6 человек',
      },
      {
        title: 'Тонкий боб',
        description: '3 - 6 человек',
      },
      {
        title: 'Черная вдова',
        description: '3 - 6 человек',
      },
      {
        title: 'Белорусский ликёр',
        description: '3 - 6 человек',
      },
    ]
  },
  {
    title: '7 этаж',
    rooms: [
      {
        title: 'Джокер',
        description: '3 - 6 человек',
      },
      {
        title: 'Мариванна',
        description: '3 - 6 человек',
      },
      {
        title: 'Тонкий боб',
        description: '3 - 6 человек',
      },
      {
        title: 'Черная вдова',
        description: '3 - 6 человек',
      },
      {
        title: 'Белорусский ликёр',
        description: '3 - 6 человек',
      },
    ]
  },
  {
    title: '8 этаж',
    rooms: [
      {
        title: 'Джокер',
        description: '3 - 6 человек',
      },
      {
        title: 'Мариванна',
        description: '3 - 6 человек',
      },
      {
        title: 'Тонкий боб',
        description: '3 - 6 человек',
      },
      {
        title: 'Черная вдова',
        description: '3 - 6 человек',
      },
      {
        title: 'Белорусский ликёр',
        description: '3 - 6 человек',
      },
    ]
  },
  {
    title: '9 этаж',
    rooms: [
      {
        title: 'Джокер',
        description: '3 - 6 человек',
      },
      {
        title: 'Мариванна',
        description: '3 - 6 человек',
      },
      {
        title: 'Тонкий боб',
        description: '3 - 6 человек',
      },
      {
        title: 'Черная вдова',
        description: '3 - 6 человек',
      },
      {
        title: 'Белорусский ликёр',
        description: '3 - 6 человек',
      },
    ]
  }
];

storiesOf('MainPage', module)
  .add('whole page', () => (
    <MainPage
      formattedDate="14 дек · Сегодня"
      roomGroups={roomGroups}
      currentTime={new Date('2018-01-09T07:30:00.55')}
    />));
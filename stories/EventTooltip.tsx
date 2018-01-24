import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { EventTooltip } from '../src/components/EventTooltip';

const event = {
  title: 'Событие 3',
  dateStart: '2018-01-09T18:30:00.55',
  dateEnd: '2018-01-09T20:45:00.55',
  room: {
    title: 'Желтый дом'
  },
  users: [
    {
      login: 'Дарт Вейдер 1',
      avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
    },
    {
      login: 'Дарт Вейдер 2',
      avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
    },
    {
      login: 'Дарт Вейдер 3',
      avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
    }
  ]
};

storiesOf('EventTooltip', module)
  .add('default', () => (
    <div>
      <EventTooltip {...event}/>
    </div>));
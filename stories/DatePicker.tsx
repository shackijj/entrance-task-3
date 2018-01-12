import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from '../src/components/DatePicker';

storiesOf('DatePicker', module)
  .add('with different dates', () => (
    <div>
      <DatePicker showCalendar={false} formattedDate="14 дек · Сегодня"/>
      <DatePicker showCalendar={false} formattedDate="14 янв · Завтра"/>
      <DatePicker showCalendar={false} formattedDate="14 янв"/>
    </div>));
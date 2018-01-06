import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from '../src/components/DatePicker';

storiesOf('DatePicker', module)
  .add('with different dates', () => (
    <div>
      <DatePicker formattedDate="14 дек · Сегодня"/>
      <DatePicker formattedDate="14 янв · Завтра"/>
      <DatePicker formattedDate="14 янв"/>
    </div>));
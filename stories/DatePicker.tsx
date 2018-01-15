import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DatePicker from '../src/components/DatePicker';

storiesOf('DatePicker', module)
  .add('with different dates', () => (
    <div>
      <DatePicker 
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={id => id}
      />
      <DatePicker 
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-12')}
        onDatePick={id => id}
      />
      <DatePicker 
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-28')}
        onDatePick={id => id}
      />
    </div>))
  .add('with calendar shown', () => (
    <div>
      <DatePicker 
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={id => id}
      />
    </div>));
import * as React from 'react';
import { storiesOf } from '@storybook/react';
import DateIntervalInput from '../src/components/DateIntervalInput';

storiesOf('DateIntervalInput', module)
  .add('with different dates', () => (
    <div>
      <DateIntervalInput
        dateStart={'2018-01-09T07:00:00.000Z'}
        dateEnd={'2018-01-09T07:15:00.000Z'}
        onChange={console.log}
      />
    </div>));
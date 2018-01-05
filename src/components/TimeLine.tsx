import * as React from 'react';
import DatePicker from './DatePicker';

import './TimeLine.css';

const TimeLine = () => (
  <div className="TimeLine">
    <DatePicker formattedDate="14 дек · Сегодня"/>
  </div>
);

export default TimeLine;

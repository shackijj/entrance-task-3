import * as React from 'react';
import * as classNames from 'classnames';

import './Timeline.css';

export interface TimelineProps {
  hourStart: number;
  hourEnd: number;
  dateCurrent?: Date;
  classes?: string[];
}

const Timeline = ({hourStart, hourEnd, dateCurrent, classes}: TimelineProps) => {
  const hours = [];
  for (let i = hourStart; i < hourEnd; i++) {
    hours.push(i + 1);
  }

  let formattedTime;
  let style;
  let hourCurrent: number | undefined;
  if (dateCurrent) {
    hourCurrent = dateCurrent.getHours();
    const hourMinutes = dateCurrent.getMinutes();
    if (hourCurrent >= hourStart && hourCurrent <= hourEnd) {
      formattedTime = `${hourCurrent}:${(hourMinutes < 10) ? '0' : ''}${hourMinutes}`;
      const totalMinutes = ((hourEnd + 1 - hourStart) * 60);
      const currentMinutes = (hourCurrent - hourStart) * 60 + hourMinutes;
      const offset = (currentMinutes / totalMinutes) * 100;
      style = {
        left: `${offset.toFixed(6)}%`,
      };
    }
  }

  return (
    <ul className={classNames('Timeline', classes)}>
      <li className="Timeline-Background"/>
      {formattedTime ?
        <li style={style} className="Timeline-CurrentTime">
          <span className="Timeline-ClockBorder"/>
          <span className="Timeline-Clock">{formattedTime}</span>
        </li> : ''}
      {hours.map((hour, idx) => (
        <li
          key={idx}
          className={classNames('Timeline-Hour', {
            'Timeline-Hour_passed': (hourCurrent && hour <= hourCurrent) ? true : false
          })}
        >
          {hour}
        </li>
      ))}
    </ul>
  );
};

export default Timeline;

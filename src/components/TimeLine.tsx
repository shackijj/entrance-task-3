import * as React from 'react';
import * as classNames from 'classnames';
import './Timeline.css';

interface TimelineProps {
  startHour?: number;
  endHour?: number;
  currentTime?: Date;
}

const Timeline = ({startHour = 0, endHour = 23, currentTime}: TimelineProps) => {
  const hours = [];
  for (let i = startHour; i < endHour; i++) {
    hours.push(i + 1);
  }

  let formattedTime;
  let style;
  let currentHour: number | undefined;
  if (currentTime) {
    currentHour = currentTime.getHours();
    const m = currentTime.getMinutes();
    formattedTime = `${currentHour}:${(m < 10) ? '0' : ''}${m}`;
    const offset = ((currentHour * 60 + m) / 1440) * 100;
    style = {
      left: `${offset.toFixed(6)}%`
    };
  }

  return (
    <ul className="Timeline">
      {formattedTime ?
        <li style={style} className="Timeline-CurrentTime">
          <span className="Timeline-Clock">{formattedTime}</span>
        </li> : ''}
      {hours.map((hour, idx) => (
          <li
            key={idx}
            className={classNames('Timeline-Hour', {
              'Timeline-Hour_passed': (currentHour && hour <= currentHour) ? true : false
            })}
          >
            {hour}
          </li>
      ))}
    </ul>
  );
};

export default Timeline;
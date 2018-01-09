import * as React from 'react';
import './Timeline.css';

interface TimelineProps {
  startHour?: number;
  endHour?: number;
  currentTime?: Date;
}

const Timeline = ({startHour = 0, endHour = 24, currentTime}: TimelineProps) => {
  const hours = [];
  for (let i = startHour; i < endHour; i++) {
    hours.push(i + 1);
  }

  let formattedTime;
  let style;
  if (currentTime) {
    const h = currentTime.getHours();
    const m = currentTime.getMinutes();
    formattedTime = `${h}:${(m < 10) ? '0' : ''}${m}`;
    style = {
      left: `${((h * 60 + m) / 1140) * 100}%`
    };
  }

  return (
    <ul className="Timeline">
      {formattedTime ? <li style={style} className="Timeline-CurrentTime">{formattedTime}</li> : ''}
      {hours.map((hour, idx) => (<li key={idx} className="Timeline-Hour">{hour}</li>))}
    </ul>
  );
};

export default Timeline;
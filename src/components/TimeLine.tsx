import * as React from 'react';
import './Timeline.css';

interface TimelineProps {
  startHour?: number;
  endHour?: number;
}

const Timeline = ({startHour = 0, endHour = 23}: TimelineProps) => {
  const hours = [];
  for (let i = startHour; i < endHour; i++) {
    hours.push(i);
  }
  return (
    <ul className="Timeline">
      {hours.map((hour, idx) => (<li key={idx} className="Timeline-Hour">{hour}</li>))}
    </ul>
  );
};

export default Timeline;
import * as React from 'react';
import './RoomTimeline.css';

interface Event {
  title: string;
  dateStart: Date;
  dateEnd: Date;
}

interface RoomTimelineProps {
  currentTime: Date;
  title: string;
  startHour: number;
  endHour: number;
  events: Event[];
}

const RoomTimeline: React.SFC<RoomTimelineProps> = () => (
  <div className="RoomTimeline"/>
);

export default RoomTimeline;

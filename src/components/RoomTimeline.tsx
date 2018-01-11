import * as React from 'react';
import './RoomTimeline.css';
import { RoomProps } from './Room';

interface Event {
  title: string;
  dateStart: Date;
  dateEnd: Date;
}

export interface RoomTimelineProps extends RoomProps {
  dateCurrent?: Date;
  title: string;
  hourStart?: number;
  hourEnd?: number;
  events: Event[];
}

const getMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

const RoomTimeline: React.SFC<RoomTimelineProps> = ({dateCurrent, events, hourStart = 0, hourEnd = 23}) => {

  const slotProps: Array<{duration: number, type: string}> = [];

  let prevEvent: Event | undefined;
  let length = events.length;

  const totalMinutes = (hourEnd - hourStart + 1) * 60;

  events.forEach((curEvent, idx, arr) => {
    const {dateStart, dateEnd} = curEvent;

    if (idx === 0 && hourStart < dateStart.getHours()) {
      slotProps.push({
        duration: (dateStart.getHours() - hourStart) * 60 + dateStart.getMinutes(),
        type: dateCurrent ? 'past' : 'free'
      });
    }

    if (prevEvent && prevEvent.dateEnd < dateStart) {
      slotProps.push({
        duration: getMinutes(dateStart) - getMinutes(prevEvent.dateEnd),
        type: 'free'
      });
    }

    if (hourStart > dateStart.getHours()) {
      slotProps.push({
        duration: getMinutes(dateEnd) - (hourStart * 60),
        type: 'event'
      });
    } else {
      slotProps.push({
        duration: getMinutes(dateEnd) - getMinutes(dateStart),
        type: 'event'
      });
    }

    if (idx === length - 1 && dateEnd.getHours() < hourEnd) {
      slotProps.push({
        duration: totalMinutes - getMinutes(dateEnd) + hourStart * 60,
        type: 'free'
      });
    }
    prevEvent = curEvent;
  });

  if (events.length === 0) {
    if (dateCurrent) {
      slotProps.push({
        duration: getMinutes(dateCurrent),
        type: 'past',
      });
      slotProps.push({
        duration: totalMinutes - getMinutes(dateCurrent),
        type: 'free',
      });
    } else {
      slotProps.push({
        duration: totalMinutes,
        type: 'free',
      });
    }
  }
  return (
    <div className="RoomTimeline">
      {slotProps.map(({type, duration}, idx) => (
        <div
          key={idx}
          className={`RoomTimeline-Slot RoomTimeline-Slot_${type}`}
          style={{width: `${((duration * 100 / totalMinutes).toFixed(6))}%`}}
        />
      ))}
    </div>
  );
};

export default RoomTimeline;

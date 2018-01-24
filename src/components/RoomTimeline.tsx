import * as React from 'react';
import './RoomTimeline.css';
import { RoomProps } from './Room';

interface Event {
  id: string;
  dateStart: string;
  dateEnd: string;
}

export interface RoomTimelineProps extends RoomProps {
  dateCurrent?: Date;
  title: string;
  hourStart: number;
  hourEnd: number;
  events: Event[];
  onEventClick?: (id: string, e: HTMLDivElement) => void;
}

const getMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

const RoomTimeline: React.SFC<RoomTimelineProps> =
  ({dateCurrent, events, hourStart, hourEnd, title, onEventClick}) => {
    const slotProps: Array<{duration: number, type: string, id?: string}> = [];

    let prevEvent: Event | undefined;
    let length = events.length;

    const totalMinutes = (hourEnd - hourStart + 1) * 60;

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const eventId = target.getAttribute('data-event-id');
        if (onEventClick && target && eventId) {
          onEventClick(eventId as string, target);
        }
    };

    events.forEach((curEvent, idx, arr) => {
      const {id} = curEvent;
      const dateStart = new Date(curEvent.dateStart);
      const dateEnd = new Date(curEvent.dateEnd);

      if (idx === 0 && hourStart <= dateStart.getHours()) {
        if (dateCurrent && dateCurrent < dateStart) {
          slotProps.push({
            duration: getMinutes(dateCurrent) - hourStart * 60,
            type: 'past'
          });
          slotProps.push({
            duration: getMinutes(dateStart) - getMinutes(dateCurrent),
            type: 'free'
          });
        } else {
          slotProps.push({
            duration: (dateStart.getHours() - hourStart) * 60 + dateStart.getMinutes(),
            type: dateCurrent ? 'past' : 'free'
          });
        }
      }

      if (prevEvent && new Date(prevEvent.dateEnd) < dateStart) {
        slotProps.push({
          duration: getMinutes(dateStart) - getMinutes(new Date(prevEvent.dateEnd)),
          type: 'free'
        });
      }

      if (hourStart > dateStart.getHours()) {
        slotProps.push({
          duration: getMinutes(dateEnd) - (hourStart * 60),
          id,
          type: 'event',
        });
      } else {
        slotProps.push({
          duration: getMinutes(dateEnd) - getMinutes(dateStart),
          id,
          type: 'event',
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
        const pastMinues = getMinutes(dateCurrent) - hourStart * 60;
        slotProps.push({
          duration: pastMinues,
          type: 'past',
        });
        slotProps.push({
          duration: totalMinutes - pastMinues,
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
      <div className="RoomTimeline" onClick={onClick}>
        {slotProps.map(({type, duration, id}, idx) => (
          <div
            key={idx}
            className={`RoomTimeline-Slot RoomTimeline-Slot_${type}`}
            data-event-id={id}
            style={{width: `${((duration * 100 / totalMinutes).toFixed(6))}%`}}
          />
        ))}
      </div>
    );
  };

export default RoomTimeline;

import * as React from 'react';
import './RoomTimeline.css';
import { RoomProps } from './Room';
import * as moment from 'moment';

export interface Event {
  id: string;
  dateStart: string;
  dateEnd: string;
}

export type Slot = {
  duration: number,
  type: string,
  id?: string,
  dateStart: string,
  dateEnd: string
};

export interface RoomTimelineProps extends RoomProps {
  date: string;
  isDateCurrent: boolean;
  title: string;
  hourStart: number;
  hourEnd: number;
  events: Event[];
  onEventClick?: (id: string, e: HTMLDivElement) => void;
}

export const generateFreeSlots = (dateStart: string, dateEnd: string) => {
  const rc: Array<{type: 'free', dateStart: string, dateEnd: string, duration: number}> = [];
  let start = moment(dateStart);
  let end = moment(dateEnd);

  let nextWholeHour = start.clone().endOf('hour');

  while (nextWholeHour < end) {
    rc.push({
      type: 'free',
      dateStart: start.toISOString(),
      dateEnd: nextWholeHour.toISOString(),
      duration: nextWholeHour.valueOf() - start.valueOf(),
    });

    start = nextWholeHour.clone().add(1, 'hour').startOf('hour');
    nextWholeHour = nextWholeHour.clone().add(1, 'hours').endOf('hour');
  }
  rc.push({
    type: 'free',
    dateStart: start.toISOString(),
    dateEnd,
    duration: moment(dateEnd).valueOf() - start.valueOf()
  });

  return rc;
};

export const generateSlots = (events: Event[], hourStart: string, hourEnd: string, dateCurrent?: string) => {
  const slots: Slot[] = [];
  const pushSlot = (slot: Slot) => slots.push(slot);

  if (events.length === 0) {
    generateFreeSlots(
      hourStart,
      hourEnd)
    .map(pushSlot);
  }

  events.forEach((event, idx, ary) => {
    const startOfEvent = moment(event.dateStart);
    const endOfEvent = moment(event.dateEnd);
    const startOfPeriod = moment(hourStart);
    const endOfPeriod = moment(hourEnd);

    if (endOfEvent.isBefore(startOfPeriod)) {
      return;
    }

    if (idx === 0) {
      if (startOfEvent.isAfter(startOfPeriod)) {
        generateFreeSlots(
          startOfPeriod.toISOString(),
          startOfEvent.clone().add(-1, 'ms').toISOString(),
        ).map(pushSlot);
      }
    }

    const prevEvent = ary[idx - 1];
    if (prevEvent) {
      const endOfPrevEvent = moment.utc(prevEvent.dateEnd);
      if (endOfPrevEvent.isBefore(startOfEvent)) {
        generateFreeSlots(
          endOfPrevEvent.clone().add(1, 'ms').toISOString(),
          startOfEvent.clone().add(-1, 'ms').toISOString(),
        ).map(pushSlot);
      }
    }

    if (startOfEvent.isBefore(startOfPeriod)) {
      slots.push({
        type: 'event',
        id:  event.id,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
        duration: +endOfEvent - +startOfPeriod,
      });
    } else {
      slots.push({
        type: 'event',
        id: event.id,
        dateStart: event.dateStart,
        dateEnd: event.dateEnd,
        duration: +endOfEvent - +startOfEvent
      });  
    }

    if (idx === ary.length - 1 && endOfEvent.isBefore(endOfPeriod)) {
      generateFreeSlots(
        endOfEvent.clone().add(1, 'ms').toISOString(),
        endOfPeriod.toISOString()
      ).map(pushSlot);
    }
  });

  return slots;
};

const RoomTimeline: React.SFC<RoomTimelineProps> =
  ({date, isDateCurrent, events, hourStart, hourEnd, title, onEventClick}) => {
    const dateStart = moment(date).startOf('day').add(hourStart, 'hours');
    const dateEnd = moment(date).startOf('day').add(hourEnd, 'hours').endOf('hour');
    const slots = generateSlots(
      events, dateStart.toISOString(), dateEnd.toISOString(), isDateCurrent ? date : undefined);

    const total = +dateEnd - +dateStart;

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const eventId = target.getAttribute('data-event-id');
        if (onEventClick && target && eventId) {
          onEventClick(eventId as string, target);
        }
    };

    return (
      <div className="RoomTimeline" onClick={onClick}>
        {slots.map(({type, duration, id}, idx) => (
          <div
            key={idx}
            className={`RoomTimeline-Slot RoomTimeline-Slot_${type}`}
            data-event-id={id}
            style={{width: `${(duration / total) * 100}%`}}
          />
        ))}
      </div>
    );
  };

export default RoomTimeline;

import * as React from 'react';
import './RoomTimeline.css';
import { RoomProps } from './Room';
import * as classNames from 'classnames';
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
  id: string;
  date: string;
  isDateCurrent: boolean;
  title: string;
  hourStart: number;
  hourEnd: number;
  events: Event[];
  highlightEventId?: string;
  onEventClick?: (eventId: string, roomId: string, div: HTMLDivElement) => void;
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
  const startOfPeriod = moment(hourStart);
  const endOfPeriod = moment(hourEnd);
  const current = moment(dateCurrent);
  
  if (events.length === 0) {
    if (dateCurrent) {
      slots.push({
        type: 'past',
        dateStart: hourStart,
        dateEnd: current.toISOString(),
        duration: +current - +startOfPeriod
      });
      generateFreeSlots(
        current.clone().add(1, 'ms').toISOString(),
        hourEnd)
      .map(pushSlot);
    } else {
      generateFreeSlots(
        hourStart,
        hourEnd)
      .map(pushSlot);
    }
  }

  events.forEach((event, idx, ary) => {
    const startOfEvent = moment(event.dateStart);
    const endOfEvent = moment(event.dateEnd);

    if (endOfEvent.isBefore(startOfPeriod)) {
      return;
    }

    if (idx === 0) {
      if (startOfEvent.isAfter(startOfPeriod)) {
        if (dateCurrent) {
          if (current.isBefore(startOfEvent)) {
            slots.push({
              type: 'past',
              dateStart: startOfPeriod.toISOString(),
              dateEnd: current.toISOString(),
              duration: +current - +startOfPeriod
            });
            generateFreeSlots(
              current.clone().add(1, 'ms').toISOString(),
              startOfEvent.clone().add(-1, 'ms').toISOString(),
            ).map(pushSlot);
          } else {
            const pastEnd = startOfEvent.clone().add(-1, 'ms');
            slots.push({
              type: 'past',
              dateStart: startOfPeriod.toISOString(),
              dateEnd: pastEnd.toISOString(),
              duration: +pastEnd - +startOfPeriod
            });
          }
        } else {
          generateFreeSlots(
            startOfPeriod.toISOString(),
            startOfEvent.clone().add(-1, 'ms').toISOString(),
          ).map(pushSlot);
        }
      }
    }

    const prevEvent = ary[idx - 1];
    if (prevEvent) {
      const endOfPrevEvent = moment.utc(prevEvent.dateEnd);
      if (endOfPrevEvent.isBefore(startOfEvent)) {
        if (dateCurrent && (current.isAfter(startOfEvent) || current.isSame(startOfEvent))) { 
          const pastStart = moment(prevEvent.dateEnd).add(1, 'ms');
          const pastEnd = startOfEvent.clone().add(-1, 'ms');
          slots.push({
            type: 'past',
            dateStart: pastStart.toISOString(),
            dateEnd: pastEnd.toISOString(),
            duration: +pastEnd - +pastStart
          });
        } else if (dateCurrent && current.isAfter(endOfPrevEvent) && current.isBefore(startOfEvent)) {
          const pastStart = moment(prevEvent.dateEnd).add(1, 'ms');
          const pastEnd = current.clone();
          slots.push({
            type: 'past',
            dateStart: pastStart.toISOString(),
            dateEnd: pastEnd.toISOString(),
            duration: +pastEnd - +pastStart
          });
          generateFreeSlots(
            pastEnd.clone().add(1, 'ms').toISOString(),
            startOfEvent.clone().add(-1, 'ms').toISOString(),
          ).map(pushSlot);
        } else {
          generateFreeSlots(
            endOfPrevEvent.clone().add(1, 'ms').toISOString(),
            startOfEvent.clone().add(-1, 'ms').toISOString(),
          ).map(pushSlot);
        }
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
      if (dateCurrent && current.isAfter(endOfEvent)) {
        const pastStart = endOfEvent.clone().add(1, 'ms');
        const pastEnd = current.clone();
        slots.push({
          type: 'past',
          dateStart: pastStart.toISOString(),
          dateEnd: pastEnd.toISOString(),
          duration: +pastEnd - +pastStart
        });
        generateFreeSlots(
          pastEnd.clone().add(1, 'ms').toISOString(),
          endOfPeriod.toISOString()
        ).map(pushSlot);
      } else {
        generateFreeSlots(
          endOfEvent.clone().add(1, 'ms').toISOString(),
          endOfPeriod.toISOString()
        ).map(pushSlot);
      }
    }
  });

  return slots;
};

const RoomTimeline: React.SFC<RoomTimelineProps> =
  ({id, date, isDateCurrent, events, hourStart, hourEnd, title, onEventClick, highlightEventId}) => {
    const dateStart = moment(date).startOf('day').add(hourStart, 'hours');
    const dateEnd = moment(date).startOf('day').add(hourEnd, 'hours').endOf('hour');
    // Slots generation could be done on a server
    const slots = generateSlots(
      events, dateStart.toISOString(), dateEnd.toISOString(), isDateCurrent ? date : undefined);

    const total = +dateEnd - +dateStart;

    return (
      <div className="RoomTimeline">
        {slots.map((slot, idx) => {
          let onSlotClick;
          let isHighlighted = false;
          if (onEventClick && slot.type === 'event' && onEventClick && slot.id) {
            onSlotClick = (event: React.MouseEvent<HTMLDivElement>) => {
              onEventClick(slot.id as string, id, event.currentTarget);
            };
          } 
          if (highlightEventId && slot.type === 'event') {
            isHighlighted = slot.id === highlightEventId;
          }
          return (<div
            key={idx}
            className={classNames([
              'RoomTimeline-Slot',
              `RoomTimeline-Slot_${slot.type}`,
              { 'RoomTimeline-Slot_event_highlighted': isHighlighted}])
            }
            onClick={onSlotClick}
            style={{width: `${(slot.duration / total) * 100}%`}}
          />);
        })}
      </div>
    );
  };

export default RoomTimeline;

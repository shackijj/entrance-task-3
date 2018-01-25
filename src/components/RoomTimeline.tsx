import * as React from 'react';
import './RoomTimeline.css';
import { RoomProps } from './Room';
import * as moment from 'moment';

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

export const generateSlots = (events: Event[], hourStart: number, hourEnd: number, dateCurrent?: Date) => {
  const slotProps: Array<{duration: number, type: string, id?: string}> = [];

  let prevEvent: Event | undefined;
  let length = events.length;

  events.forEach((curEvent, idx, arr) => {
    const {id} = curEvent;
    const dateStart = new Date(curEvent.dateStart);
    const dateEnd = new Date(curEvent.dateEnd);
    let startOfDay = moment(dateStart).startOf('day');

    if (idx === 0 && hourStart <= dateStart.getHours()) {
      if (dateCurrent && dateCurrent < dateStart) {
        slotProps.push({
          duration: getMinutes(dateCurrent) - hourStart * 60,
          type: 'past'
        });
        generateFreeSlots(dateCurrent.toISOString(), dateStart.toISOString())
          .map((slot) => slotProps.push(slot));
      } else {
        if (dateCurrent) {
          slotProps.push({
            duration: (dateStart.getHours() - hourStart) * 60 + dateStart.getMinutes(),
            type: 'past',
          });
        } else {
          generateFreeSlots(startOfDay.clone().add(hourStart, 'hours').toISOString(), dateStart.toISOString())
            .map((slot) => slotProps.push(slot));
        }
      }
    }

    if (prevEvent && new Date(prevEvent.dateEnd) < dateStart) {
      generateFreeSlots(prevEvent.dateEnd, dateStart.toISOString())
        .map((slot) => slotProps.push(slot));
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
      generateFreeSlots(
        dateEnd.toISOString(),
        startOfDay.clone().add(hourEnd, 'hours').add(59, 'minutes').toISOString())
        .map((slot) => slotProps.push(slot));
    }
    prevEvent = curEvent;
  });

  if (events.length === 0) {
    if (dateCurrent) {
      let startOfDay = moment(dateCurrent).startOf('day');
      const pastMinues = getMinutes(dateCurrent) - hourStart * 60;
      slotProps.push({
        duration: pastMinues,
        type: 'past',
      });
      generateFreeSlots(
        dateCurrent.toISOString(),
        startOfDay.clone().add(hourEnd, 'hours').add(59, 'minutes').toISOString())
        .map((slot) => slotProps.push(slot));
    } else {
      let startOfDay = moment(new Date()).startOf('day');
      generateFreeSlots(
        startOfDay.clone().add(hourStart, 'hours').toISOString(),
        startOfDay.clone().add(hourEnd, 'hours').add(59, 'minutes').toISOString())
        .map((slot) => slotProps.push(slot));
    }
  }
  return slotProps;
};

const RoomTimeline: React.SFC<RoomTimelineProps> =
  ({dateCurrent, events, hourStart, hourEnd, title, onEventClick}) => {
    const slotProps = generateSlots(events, hourStart, hourEnd, dateCurrent);

    const totalMinutes = (hourEnd - hourStart + 1) * 60;

    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as HTMLDivElement;
        const eventId = target.getAttribute('data-event-id');
        if (onEventClick && target && eventId) {
          onEventClick(eventId as string, target);
        }
    };

    return (
      <div className="RoomTimeline" onClick={onClick}>
        {slotProps.map(({type, duration, id}, idx) => (
          <div
            key={idx}
            className={`RoomTimeline-Slot RoomTimeline-Slot_${type}`}
            data-event-id={id}
            style={{width: `${(duration * 100 / totalMinutes)}%`}}
          />
        ))}
      </div>
    );
  };

export default RoomTimeline;

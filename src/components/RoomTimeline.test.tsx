import * as React from 'react';
import { mount, shallow } from 'enzyme';
import RoomTimeline, { generateFreeSlots, generateSlots, Event } from './RoomTimeline';

const getDuration = (start: string, end: string) => (new Date(end)).getTime() - (new Date(start)).getTime();

describe('#generateFreeSlots', () => {
  it('should dateStart and dateEnd and generate free slots', () => {
    const dateStart = '2018-01-09T06:33:00.000Z';
    const dateEnd = '2018-01-09T08:28:00.000Z';

    const event1Start = '2018-01-09T06:33:00.000Z';
    const event1End = '2018-01-09T06:59:59.999Z';

    const event2Start = '2018-01-09T07:00:00.000Z';
    const event2End = '2018-01-09T07:59:59.999Z';

    const event3Start = '2018-01-09T08:00:00.000Z';
    const event3End = '2018-01-09T08:28:00.000Z';

    const expected = [
      {
        type: 'free',
        dateStart: event1Start,
        dateEnd: event1End,
        duration: getDuration(event1Start, event1End)
      },
      {
        type: 'free',
        dateStart: event2Start,
        dateEnd: event2End,
        duration: getDuration(event2Start, event2End)
      },
      {
        type: 'free',
        dateStart: event3Start,
        dateEnd: event3End,
        duration: getDuration(event3Start, event3End)
      },
    ];

    const actual = generateFreeSlots(dateStart, dateEnd);
    expect(actual).toEqual(expected);
  });
});

describe('#generateSlots', () => {
  it('duration of the first event is calculated according to hourStart', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T09:59:59.999Z';

    const eventStart = '2018-01-09T06:30:00.000Z';
    const eventEnd = '2018-01-09T08:44:59.999Z';

    const free1Start = '2018-01-09T08:45:00.000Z';
    const free1End = '2018-01-09T08:59:59.999Z';

    const free2Start = '2018-01-09T09:00:00.000Z';

    const events = [
      {
        id: '1',
        dateStart: eventStart,
        dateEnd: eventEnd,
      },
    ];

    const expected = [
      {
        type: 'event',
        id: '1',
        dateStart: eventStart,
        dateEnd: eventEnd,
        duration: getDuration(hourStart, eventEnd)
      },
      {
        type: 'free',
        dateStart: free1Start,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
      {
        type: 'free',
        dateStart: free2Start,
        dateEnd: hourEnd,
        duration: getDuration(free2Start, hourEnd)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd);
    expect(actual).toEqual(expected);
  });

  it('time before the first event should be filled with free slots', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T09:59:59.999Z';

    const free1Start = hourStart;
    const free1End = '2018-01-09T07:29:59.999Z';

    const eventStart = '2018-01-09T07:30:00.000Z';
    const eventEnd = '2018-01-09T08:44:59.999Z';

    const free2Start = '2018-01-09T08:45:00.000Z';
    const free2End = '2018-01-09T08:59:59.999Z';

    const free3Start = '2018-01-09T09:00:00.000Z';

    const events = [
      {
        id: '1',
        dateStart: eventStart,
        dateEnd: eventEnd,
      },
    ];

    const expected = [
      {
        type: 'free',
        dateStart: hourStart,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
      {
        type: 'event',
        id: '1',
        dateStart: eventStart,
        dateEnd: eventEnd,
        duration: getDuration(eventStart, eventEnd)
      },
      {
        type: 'free',
        dateStart: free2Start,
        dateEnd: free2End,
        duration: getDuration(free2Start, free2End)
      },
      {
        type: 'free',
        dateStart: free3Start,
        dateEnd: hourEnd,
        duration: getDuration(free3Start, hourEnd)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd);
    expect(actual).toEqual(expected);
  });

  it('should be filled with empty slots if events are not given', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T08:59:59.999Z';

    const free1Start = hourStart;
    const free1End = '2018-01-09T07:59:59.999Z';

    const free2Start = '2018-01-09T08:00:00.000Z';
    const free2End = hourEnd;

    const events: Event[] = [];

    const expected = [
      {
        type: 'free',
        dateStart: hourStart,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
      {
        type: 'free',
        dateStart: free2Start,
        dateEnd: free2End,
        duration: getDuration(free2Start, free2End)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd);
    expect(actual).toEqual(expected);
  });

  it('time between two events should be filled with free slots', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T08:59:59.999Z';

    const free1Start = hourStart;
    const free1End = '2018-01-09T07:29:59.999Z';

    const event1Start = '2018-01-09T07:30:00.000Z';
    const event1End = '2018-01-09T07:44:59.999Z';

    const free2Start = '2018-01-09T07:45:00.000Z';
    const free2End = '2018-01-09T07:59:59.999Z';

    const event2Start = '2018-01-09T08:00:00.000Z';
    const event2End = '2018-01-09T08:44:59.999Z';

    const free3Start = '2018-01-09T08:45:00.000Z';

    const events = [
      {
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
      },
      {
        id: '2',
        dateStart: event2Start,
        dateEnd: event2End,
      },
    ];

    const expected = [
      {
        type: 'free',
        dateStart: hourStart,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
      {
        type: 'event',
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
        duration: getDuration(event1Start, event1End)
      },
      {
        type: 'free',
        dateStart: free2Start,
        dateEnd: free2End,
        duration: getDuration(free2Start, free2End)
      },
      {
        type: 'event',
        id: '2',
        dateStart: event2Start,
        dateEnd: event2End,
        duration: getDuration(event2Start, event2End)
      },
      {
        type: 'free',
        dateStart: free3Start,
        dateEnd: hourEnd,
        duration: getDuration(free3Start, hourEnd)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd);
    expect(actual).toEqual(expected);
  });

  it('time between two events should be filled with free slots', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T07:59:59.999Z';

    const free1Start = hourStart;
    const free1End = '2018-01-09T07:29:59.999Z';

    const event1Start = '2018-01-09T07:30:00.000Z';
    const event1End = '2018-01-09T07:44:54.208Z';

    const free2Start = '2018-01-09T07:44:54.209Z';
    const free2End = '2018-01-09T07:59:59.999Z';

    const events = [
      {
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
      },
    ];

    const expected = [
      {
        type: 'free',
        dateStart: hourStart,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
      {
        type: 'event',
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
        duration: getDuration(event1Start, event1End)
      },
      {
        type: 'free',
        dateStart: free2Start,
        dateEnd: free2End,
        duration: getDuration(free2Start, free2End)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd);
    expect(actual).toEqual(expected);
  });

  it('past slots should be created before the first event', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T07:59:59.999Z';
    
    const dateCurrent = '2018-01-09T07:31:00.000Z';

    const pastStart = hourStart;
    const pastEnd = '2018-01-09T07:29:59.999Z';

    const event1Start = '2018-01-09T07:30:00.000Z';
    const event1End = '2018-01-09T07:44:54.208Z';

    const free1Start = '2018-01-09T07:44:54.209Z';
    const free1End = '2018-01-09T07:59:59.999Z';

    const events = [
      {
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
      },
    ];

    const expected = [
      {
        type: 'past',
        dateStart: pastStart,
        dateEnd: pastEnd,
        duration: getDuration(pastStart, pastEnd)
      },
      {
        type: 'event',
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
        duration: getDuration(event1Start, event1End)
      },
      {
        type: 'free',
        dateStart: free1Start,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd, dateCurrent);
    expect(actual).toEqual(expected);
  });

  it('past slots should be created before the first free slots', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T07:59:59.999Z';
    
    const dateCurrent = '2018-01-09T07:12:00.000Z';

    const pastStart = hourStart;
    const pastEnd = dateCurrent;

    const free1Start = '2018-01-09T07:12:00.001Z';
    const free1End = '2018-01-09T07:29:59.999Z';

    const event1Start = '2018-01-09T07:30:00.000Z';
    const event1End = '2018-01-09T07:44:54.208Z';

    const free2Start = '2018-01-09T07:44:54.209Z';
    const free2End = '2018-01-09T07:59:59.999Z';

    const events = [
      {
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
      },
    ];

    const expected = [
      {
        type: 'past',
        dateStart: pastStart,
        dateEnd: pastEnd,
        duration: getDuration(pastStart, pastEnd)
      },
      {
        type: 'free',
        dateStart: free1Start,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
      {
        type: 'event',
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
        duration: getDuration(event1Start, event1End)
      },
      {
        type: 'free',
        dateStart: free2Start,
        dateEnd: free2End,
        duration: getDuration(free2Start, free2End)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd, dateCurrent);
    expect(actual).toEqual(expected);
  });

  it('past slots should be created before the first free slots if events are empty', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T07:59:59.999Z';
    
    const dateCurrent = '2018-01-09T07:12:00.000Z';

    const pastStart = hourStart;
    const pastEnd = dateCurrent;

    const free1Start = '2018-01-09T07:12:00.001Z';
    const free1End = hourEnd;

    const events: Event[] = [];

    const expected = [
      {
        type: 'past',
        dateStart: pastStart,
        dateEnd: pastEnd,
        duration: getDuration(pastStart, pastEnd)
      },
      {
        type: 'free',
        dateStart: free1Start,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd, dateCurrent);
    expect(actual).toEqual(expected);
  });

  it('past slots should be created between two sibling events', () => {
    const hourStart = '2018-01-09T06:00:00.000Z';
    const hourEnd = '2018-01-09T09:59:59.999Z';
    
    const dateCurrent = '2018-01-09T09:10:00.000Z';

    const past1Start = hourStart;
    const past1End = '2018-01-09T06:59:59.999Z';

    const event1Start = '2018-01-09T07:00:00.000Z';
    const event1End = '2018-01-09T07:30:00.000Z';

    const past2Start = '2018-01-09T07:30:00.001Z';
    const past2End = '2018-01-09T07:59:59.999Z';

    const event2Start = '2018-01-09T08:00:00.000Z';
    const event2End = '2018-01-09T08:15:00.000Z';

    const past3Start = '2018-01-09T08:15:00.001Z';
    const past3End = dateCurrent;

    const free1Start = '2018-01-09T09:10:00.001Z';
    const free1End = '2018-01-09T09:29:59.999Z';

    const event3Start = '2018-01-09T09:30:00.000Z';
    const event3End = '2018-01-09T09:45:00.000Z';

    const free3Start = '2018-01-09T09:45:00.001Z';
    const free3End = hourEnd;

    const events = [
      {
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
      },
      {
        id: '2',
        dateStart: event2Start,
        dateEnd: event2End,
      },
      {
        id: '3',
        dateStart: event3Start,
        dateEnd: event3End,
      },
    ];

    const expected = [
      {
        type: 'past',
        dateStart: past1Start,
        dateEnd: past1End,
        duration: getDuration(past1Start, past1End)
      },
      {
        type: 'event',
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
        duration: getDuration(event1Start, event1End)
      },
      {
        type: 'past',
        dateStart: past2Start,
        dateEnd: past2End,
        duration: getDuration(past2Start, past2End)
      },
      {
        type: 'event',
        id: '2',
        dateStart: event2Start,
        dateEnd: event2End,
        duration: getDuration(event2Start, event2End)
      },
      {
        type: 'past',
        dateStart: past3Start,
        dateEnd: past3End,
        duration: getDuration(past3Start, past3End)
      },
      {
        type: 'free',
        dateStart: free1Start,
        dateEnd: free1End,
        duration: getDuration(free1Start, free1End)
      },
      {
        type: 'event',
        id: '3',
        dateStart: event3Start,
        dateEnd: event3End,
        duration: getDuration(event3Start, event3End)
      },
      {
        type: 'free',
        dateStart: free3Start,
        dateEnd: free3End,
        duration: getDuration(free3Start, free3End)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd, dateCurrent);
    expect(actual).toEqual(expected);
  });

  it('past slots should be created before dateCurrent and free slots should be created dateCurrent', () => {
    const hourStart = '2018-01-09T07:00:00.000Z';
    const hourEnd = '2018-01-09T07:59:59.999Z';
    
    const dateCurrent = '2018-01-09T07:30:00.000Z';

    const past1Start = hourStart;
    const past1End = '2018-01-09T07:09:59.999Z';

    const event1Start = '2018-01-09T07:10:00.000Z';
    const event1End = '2018-01-09T07:20:00.000Z';

    const past2Start = '2018-01-09T07:20:00.001Z';
    const past2End = dateCurrent;

    const freeStart = '2018-01-09T07:30:00.001Z';
    const freeEnd = '2018-01-09T07:59:59.999Z';

    const events = [
      {
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
      },
    ];

    const expected = [
      {
        type: 'past',
        dateStart: past1Start,
        dateEnd: past1End,
        duration: getDuration(past1Start, past1End)
      },
      {
        type: 'event',
        id: '1',
        dateStart: event1Start,
        dateEnd: event1End,
        duration: getDuration(event1Start, event1End)
      },
      {
        type: 'past',
        dateStart: past2Start,
        dateEnd: past2End,
        duration: getDuration(past1Start, past1End)
      },
      {
        type: 'free',
        dateStart: freeStart,
        dateEnd: freeEnd,
        duration: getDuration(freeStart, freeEnd)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd, dateCurrent);
    expect(actual).toEqual(expected);
  });
});

describe('RoomTimeline', () => {
  it('should fire onEventClick when an event is clicked', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <RoomTimeline
        id={'1'}
        date={'2018-01-09T07:30:00.55'}
        isDateCurrent={true}
        hourStart={7}
        hourEnd={23}
        title={'Ржавый Фред'}
        onEventClick={spy}
        capacity={4}
        events={
          [
            {
              id: '1',
              dateStart: '2018-01-09T10:00:00.55',
              dateEnd: '2018-01-09T13:00:00.55',
            },
          ]
        }
      />
    );

    wrapper
      .find('.RoomTimeline-Slot_event')
      .simulate('click');

    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should fire onEventClick when an event is clicked', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <RoomTimeline
        id={'1'}
        date={'2018-01-09T07:30:00.55'}
        isDateCurrent={true}
        hourStart={7}
        hourEnd={23}
        title={'Ржавый Фред'}
        onEventClick={spy}
        capacity={4}
        events={
          [
            {
              id: '1',
              dateStart: '2018-01-09T10:00:00.55',
              dateEnd: '2018-01-09T13:00:00.55',
            },
          ]
        }
      />
    );

    wrapper
      .find('.RoomTimeline-Slot_event')
      .simulate('click');

    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should highlight events if their id is equal with given', () => {
    const wrapper = shallow(
      <RoomTimeline
        id={'1'}
        date={'2018-01-09T07:30:00.55'}
        isDateCurrent={true}
        hourStart={7}
        hourEnd={23}
        title={'Ржавый Фред'}
        capacity={4}
        highlightEventId={'1'}
        events={
          [
            {
              id: '1',
              dateStart: '2018-01-09T10:00:00.555Z',
              dateEnd: '2018-01-09T13:00:00.555Z',
            },
            {
              id: '2',
              dateStart: '2018-01-09T13:59:00.555Z',
              dateEnd: '2018-01-09T13:00:00.555Z',
            },
          ]
        }
      />
    );

    const events = wrapper.find('.RoomTimeline-Slot_event');
    expect(events).toHaveLength(2);
    expect(shallow(events.get(0)).hasClass('RoomTimeline-Slot_event_highlighted')).toBeTruthy();
    expect(shallow(events.get(1)).hasClass('RoomTimeline-Slot_event_highlighted')).toBeFalsy();
  });
});

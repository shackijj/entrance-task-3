import * as React from 'react';
import { shallow, mount } from 'enzyme';
import RoomTimeline, { generateFreeSlots, generateSlots } from './RoomTimeline';

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
    const hourStart = 7;
    const hourStartDate = '2018-01-09T07:00:00.000Z';
    const hourEnd = 9;
    const hourEndDate = '2018-01-09T09:59:59.999Z';

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
        duration: getDuration(hourStartDate, eventEnd)
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
        dateEnd: hourEndDate,
        duration: getDuration(free2Start, hourEndDate)
      },
    ];
    const actual = generateSlots(events, hourStart, hourEnd);
    expect(actual).toEqual(expected);
  });
});

describe('RoomTimeline', () => {
  it('should fire onEventClick when an event is clicked', () => {
    const spy = jest.fn();
    const wrapper = mount(
      <RoomTimeline
        dateCurrent={new Date('2018-01-09T07:30:00.55')}
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
});

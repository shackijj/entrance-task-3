import * as React from 'react';
import { shallow, mount } from 'enzyme';
import RoomTimeline from './RoomTimeline';

describe('RoomTimeline', () => {
  const dateCurrent = new Date('2018-01-09T07:30:00.55');
  const users = [
    {
      login: 'Test',
      avatarUrl: 'Fest'
    }
  ];
  const room = {
    title: 'Ржавый Фред',
    description: '3 - 6 человек',
    capacity: 6,
    events: [
      {
        id: '1',
        title: 'Событие 1',
        dateStart: '2018-01-09T06:30:00.55',
        dateEnd: '2018-01-09T08:45:00.55',
        users
      },
      {
        id: '2',
        title: 'Событие 2',
        dateStart: '2018-01-09T09:30:00.55',
        dateEnd: '2018-01-09T11:45:00.55',
        users
      },
      {
        id: '3',
        title: 'Событие 3',
        dateStart: '2018-01-09T18:30:00.55',
        dateEnd: '2018-01-09T20:45:00.55',
        users
      }
    ]
  };

  const getStyleProp = (element: React.ReactElement<{}>) => shallow(element).prop('style');

  it('should be a room representation for the timeline', () => {
    const wrapper = shallow(
      <RoomTimeline
        {...room}
        dateCurrent={dateCurrent}
        hourStart={0}
        hourEnd={23}
      />
    );
    expect(wrapper.find('.RoomTimeline')).toHaveLength(1);
  });

  it('should render slots for timeline view', () => {
    const wrapper = shallow(
      <RoomTimeline
        {...room}
        dateCurrent={dateCurrent}
        hourStart={0}
        hourEnd={23}
      />
    );
    expect(wrapper.find('.RoomTimeline-Slot')).toHaveLength(7);
    expect(wrapper.find('.RoomTimeline-Slot_past')).toHaveLength(1);
    expect(wrapper.find('.RoomTimeline-Slot_free')).toHaveLength(3);
    expect(wrapper.find('.RoomTimeline-Slot_event')).toHaveLength(3);
  });

  it('should work without dateCurrent', () => {
    const wrapper = shallow(
      <RoomTimeline
        {...room}
        hourStart={0}
        hourEnd={23}
      />
    );

    expect(wrapper.find('.RoomTimeline-Slot')).toHaveLength(7);
    expect(wrapper.find('.RoomTimeline-Slot_free')).toHaveLength(4);
    expect(wrapper.find('.RoomTimeline-Slot_event')).toHaveLength(3);
  });

  it('should set width in % for each slot', () => {
    const wrapper = shallow(
      <RoomTimeline
        {...room}
        hourStart={0}
        hourEnd={23}
      />
    );
    
    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(slots).toHaveLength(7);
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '27.083333%' // 6h30m / 24h
    });
    expect(getStyleProp(slots.get(1))).toEqual({
      width: '9.375000%' // 2h15m / 24h
    });
    expect(getStyleProp(slots.get(2))).toEqual({
      width: '3.125000%' // 45m / 24h
    });
    expect(getStyleProp(slots.get(3))).toEqual({
      width: '9.375000%' // 2h15m / 24h
    });
    expect(getStyleProp(slots.get(4))).toEqual({
      width: '28.125000%' // 2h15m / 24h
    });
    expect(getStyleProp(slots.get(5))).toEqual({
      width: '9.375000%' // 2h15m / 24h
    });
    expect(getStyleProp(slots.get(6))).toEqual({
      width: '13.541667%' // 3h15m / 24h
    });
  });

  it('should be ok with other hourStart and hourEnd', () => {
    const wrapper = shallow(
      <RoomTimeline
        {...room}
        hourStart={7}
        hourEnd={23}
      />
    );

    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(slots).toHaveLength(6);
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '10.294118%' // 6h30m / 17h
    });
    expect(getStyleProp(slots.get(1))).toEqual({
      width: '4.411765%' // 2h15m / 17h
    });
    expect(getStyleProp(slots.get(2))).toEqual({
      width: '13.235294%' // 45m / 17h
    });
    expect(getStyleProp(slots.get(3))).toEqual({
      width: '39.705882%' // 2h15m / 17h
    });
    expect(getStyleProp(slots.get(4))).toEqual({
      width: '13.235294%' // 2h15m / 17h
    });
    expect(getStyleProp(slots.get(5))).toEqual({
      width: '19.117647%' // 3h15m / 17h
    });
  });

  it('should set width in % for each slot when dateCurrent given', () => {
    const wrapper = shallow(
      <RoomTimeline
        dateCurrent={new Date('2018-01-09T07:30:00.55')}
        hourStart={0}
        hourEnd={23}
        title={'Ржавый Фред'}
        capacity={6}
        events={
          [
            {
              id: '1',
              dateStart: '2018-01-09T06:30:00.55',
              dateEnd: '2018-01-09T08:45:00.55',
            },
          ]
        }
      />
    );

    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '27.083333%' // 6h30m / 24h
    });
    expect(getStyleProp(slots.get(1))).toEqual({
      width: '9.375000%' // 2h15m / 24h
    });
    expect(getStyleProp(slots.get(2))).toEqual({
      width: '63.541667%' // 15h15m / 24h
    });
  });

  it('the first event is earlier that dateCurrent', () => {
    const wrapper = shallow(
      <RoomTimeline
        dateCurrent={new Date('2018-01-09T07:30:00.55')}
        hourStart={0}
        hourEnd={23}
        title={'Ржавый Фред'}
        capacity={6}
        events={
          [
            {
              id: '1',
              dateStart: '2018-01-09T05:04:00.55',
              dateEnd: '2018-01-09T10:00:00.23',
            },
          ]
        }
      />
    );

    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '21.111111%' // 5h4m / 24h
    });
    expect(getStyleProp(slots.get(1))).toEqual({
      width: '20.555556%' // 4h56m / 24h
    });
    expect(getStyleProp(slots.get(2))).toEqual({
      width: '58.333333%' // 14h0m / 24h
    });
  });

  it('should render one free slot if events are empty', () => {
    const wrapper = shallow(
      <RoomTimeline
        hourStart={0}
        hourEnd={23}
        title={'Ржавый Фред'}
        capacity={4}
        events={[]}
      />
    );

    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(slots).toHaveLength(1);
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '100.000000%'
    });
  });

  it('should render one free slot if events are empty', () => {
    const wrapper = shallow(
      <RoomTimeline
        dateCurrent={new Date('2018-01-09T07:30:00.55')}
        hourStart={0}
        hourEnd={23}
        title={'Ржавый Фред'}
        capacity={4}
        events={[]}
      />
    );

    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(slots).toHaveLength(2);
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '31.250000%'
    });
    expect(getStyleProp(slots.get(1))).toEqual({
      width: '68.750000%'
    });
  });

  it('empty events and current date width non-default start hours', () => {
    const wrapper = shallow(
      <RoomTimeline
        dateCurrent={new Date('2018-01-09T07:30:00.55')}
        hourStart={7}
        hourEnd={23}
        title={'Ржавый Фред'}
        capacity={4}
        events={[]}
      />
    );

    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(slots).toHaveLength(2);
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '2.941176%'
    });
    expect(getStyleProp(slots.get(1))).toEqual({
      width: '97.058824%'
    });
  });

  it('empty events and current date width non-default start hours', () => {
    const wrapper = shallow(
      <RoomTimeline
        dateCurrent={new Date('2018-01-09T07:30:00.55')}
        hourStart={7}
        hourEnd={23}
        title={'Ржавый Фред'}
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

    const slots = wrapper.find('.RoomTimeline-Slot');
    expect(slots).toHaveLength(4);
    expect(getStyleProp(slots.get(0))).toEqual({
      width: '2.941176%'
    });
    expect(getStyleProp(slots.get(1))).toEqual({
      width: '14.705882%'
    });
    expect(getStyleProp(slots.get(2))).toEqual({
      width: '17.647059%'
    });
    expect(getStyleProp(slots.get(3))).toEqual({
      width: '64.705882%'
    });
  });

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

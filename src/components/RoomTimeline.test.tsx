import * as React from 'react';
import { shallow } from 'enzyme';
import RoomTimeline from './RoomTimeline';

describe('RoomTimeline', () => {
  const dateCurrent = new Date('2018-01-09T07:30:00.55');
  const room = {
    title: 'Ржавый Фред',
    description: '3 - 6 человек',
    events: [
      {
        title: 'Событие 1',
        dateStart: new Date('2018-01-09T06:30:00.55'),
        dateEnd: new Date('2018-01-09T08:45:00.55')
      },
      {
        title: 'Событие 2',
        dateStart: new Date('2018-01-09T09:30:00.55'),
        dateEnd: new Date('2018-01-09T11:45:00.55')
      },
      {
        title: 'Событие 3',
        dateStart: new Date('2018-01-09T18:30:00.55'),
        dateEnd: new Date('2018-01-09T20:45:00.55')
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
    const actual = shallow(
      <RoomTimeline
        {...room}
        dateCurrent={dateCurrent}
        hourStart={0}
        hourEnd={23}
      />
    );
    const expected = (
      <div className="RoomTimeline">
        <div className="RoomTimeline-Slot RoomTimeline-Slot_past"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_event"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_free"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_event"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_free"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_event"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_free"/>
      </div>
    );
    expect(actual.matchesElement(expected)).toBeTruthy();
  });

  it('should work without dateCurrent', () => {
    const actual = shallow(
      <RoomTimeline
        {...room}
        hourStart={0}
        hourEnd={23}
      />
    );
    const expected = (
      <div className="RoomTimeline">
        <div className="RoomTimeline-Slot RoomTimeline-Slot_free"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_event"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_free"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_event"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_free"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_event"/>
        <div className="RoomTimeline-Slot RoomTimeline-Slot_free"/>
      </div>
    );
    expect(actual.matchesElement(expected)).toBeTruthy();
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
        description={'3 - 6 человек'}
        events={
          [
            {
              title: 'Событие 1',
              dateStart: new Date('2018-01-09T06:30:00.55'),
              dateEnd: new Date('2018-01-09T08:45:00.55')
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
        description={'3 - 6 человек'}
        events={
          [
            {
              title: 'Событие 3',
              dateStart: new Date('2018-01-09T05:04:00.55'),
              dateEnd: new Date('2018-01-09T10:00:00.23')
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
        description={'3 - 6 человек'}
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
        description={'3 - 6 человек'}
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
});

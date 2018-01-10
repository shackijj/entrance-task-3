import * as React from 'react';
import { shallow } from 'enzyme';
import RoomTimeline from './RoomTimeline';

describe('RoomTimeline', () => {
  const startHour = 0;
  const endHour = 23;
  const currentTime = new Date('2018-01-09T07:30:00.55');
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
  const wrapper = shallow(
    <RoomTimeline
      {...room}
      currentTime={currentTime}
      startHour={startHour}
      endHour={endHour}
    />
  );

  it('should be a room representation for the timeline', () => {
    expect(wrapper.find('.RoomTimeline')).toHaveLength(1);
  });
});

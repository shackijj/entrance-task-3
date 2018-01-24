import * as React from 'react';
import EventsDiagram from './EventsDiagram';
import EventTooltip from './EventTooltip';
import shallowExpect from '../utils/shallowExpect';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';

describe('EventDiagram', () => {
  it('should render a floors list', () => {
    const floor = [
      {
        floor: 7,
        rooms: [
          {
            title: 'Ржавый Фред',
            capacity: 7,
            events: [
              {
                id: '1',
                title: 'Событие 1',
                dateStart: '2018-01-09T06:30:00.55',
                dateEnd: '2018-01-09T08:45:00.55',
                users: [],
              },
              {
                id: '2',
                title: 'Событие 2',
                dateStart: '2018-01-09T09:30:00.55',
                dateEnd: '2018-01-09T11:45:00.55',
                users: [],
              },
              {
                id: '3',
                title: 'Событие 3',
                dateStart: '2018-01-09T18:30:00.55',
                dateEnd: '2018-01-09T20:45:00.55',
                users: [],
              }
            ]
          }
        ]
      }
    ];
    shallowExpect(
      <MockedProvider>
        <EventsDiagram
          floors={floor}
          classes={['EventDiagram-Story']}
        />
      </MockedProvider>)
      .toMatchSnapshot();
  });

  it('should show an events tooltip when an event is clicked', () => {
    const floor = [
      {
        floor: 7,
        rooms: [
          {
            title: 'Ржавый Фред',
            capacity: 7,
            events: [
              {
                id: '1',
                title: 'Событие 1',
                dateStart: '2018-01-09T06:30:00.55',
                dateEnd: '2018-01-09T08:45:00.55',
                users: [],
              }
            ]
          }
        ]
      }
    ];
    const wrapper = mount(
      <MockedProvider>
        <EventsDiagram
          floors={floor}
          classes={['EventDiagram-Story']}
        />
      </MockedProvider>
    );

    expect(wrapper
      .find('.EventsDiagram')
      .hasClass('EventsDiagram_noscroll')).toBeFalsy();

    wrapper
      .find('.RoomTimeline-Slot_event')
      .simulate('click');

    expect(wrapper.find(EventTooltip)).toHaveLength(1);

    expect(wrapper
      .find('.EventsDiagram')
      .hasClass('EventsDiagram_noscroll')).toBeTruthy();
  });
});
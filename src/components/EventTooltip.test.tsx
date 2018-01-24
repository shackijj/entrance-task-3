import * as React from 'react';
import { EventTooltip } from './EventTooltip';
import { mount } from 'enzyme';
import shallowExpect from '../utils/shallowExpect';

describe('EventTooltip', () => {
  it('should render an event', () => {
    const props = {
      title: 'Событие 3',
      dateStart: '2018-01-09T18:30:00.55',
      dateEnd: '2018-01-09T20:45:00.55',
      room: {
        title: 'Желтый дом'
      },
      users: [
        {
          login: 'Дарт Вейдер 1',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        },
        {
          login: 'Дарт Вейдер 2',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        },
        {
          login: 'Дарт Вейдер 3',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        }
      ]
    };

    shallowExpect(<EventTooltip {...props} />).toMatchSnapshot();
  });

  it('fire onCloseClick cb when the close button is clicked', () => {
    const spy = jest.fn();
    const props = {
      onCloseClick: spy,
      title: 'Событие 3',
      dateStart: '2018-01-09T18:30:00.55',
      dateEnd: '2018-01-09T20:45:00.55',
      room: {
        title: 'Желтый дом'
      },
      users: [
        {
          login: 'Дарт Вейдер 1',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        }
      ]
    };

    const wrapper = mount(<EventTooltip {...props} />);
    expect(spy.mock.calls.length).toEqual(0);
    wrapper.find('.EventTooltip-CloseButton').simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('fire onCloseClick cb when the edit button is clicked', () => {
    const spy = jest.fn();
    const props = {
      onEditClick: spy,
      title: 'Событие 3',
      dateStart: '2018-01-09T18:30:00.55',
      dateEnd: '2018-01-09T20:45:00.55',
      room: {
        title: 'Желтый дом'
      },
      users: [
        {
          login: 'Дарт Вейдер 1',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        }
      ]
    };

    const wrapper = mount(<EventTooltip {...props} />);
    expect(spy.mock.calls.length).toEqual(0);
    wrapper.find('.EventTooltip-EditButton').simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });
});
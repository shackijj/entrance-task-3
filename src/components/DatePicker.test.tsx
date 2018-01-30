import * as React from 'react';
import { DatePicker } from './DatePicker';
import { shallow, mount } from 'enzyme';
import RountButton from './RoundButton';

describe('DatePicker', () => {
  const id = (x: string) => x;
  it('should be a div with DatePicker class', () => {
    const wrapper = shallow(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-10')}
        onDatePick={id}
      />
    );
    expect(wrapper.find('div.DatePicker')).toHaveLength(1);
  });

  it('should change class attr depending on classes prop', () => {
    const wrapper = shallow(
      <DatePicker 
        classes={['Test']}
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-10')}
        onDatePick={id}
      />
    );
    const div = wrapper.find('div.DatePicker');
    expect(div.hasClass('DatePicker Test')).toEqual(true);
  });

  it('should format date in D MMM format', () => {
    const wrapper = shallow(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-10')}
        onDatePick={id}
      />
    );

    expect(wrapper.find('.DatePicker-Date').text()).toEqual('10 янв');
  });

  it('should add TODAY if dateCurrent and dateChosen has the same date', () => {
    const wrapper = shallow(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={id}
      />
    );

    expect(wrapper.find('.DatePicker-Date').text()).toEqual('9 янв · Сегодня');
  });

  it('should fire onDatePick when left arrow is clicked', () => {
    const mockCb = jest.fn();
    const wrapper = shallow(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={mockCb}
      />
    );

    wrapper
      .find(RountButton)
      .first()
      .simulate('click');

    expect(mockCb.mock.calls.length).toBe(1);
    expect(mockCb.mock.calls[0][0]).toBe('2018-01-08');
  });

  it('should fire onDatePick when right arrow is clicked', () => {
    const mockCb = jest.fn();
    const wrapper = shallow(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={mockCb}
      />
    );

    wrapper
      .find(RountButton)
      .at(1)
      .simulate('click');

    expect(mockCb.mock.calls.length).toBe(1);
    expect(mockCb.mock.calls[0][0]).toBe('2018-01-10');
  });

  it('should fire onDatePick on calendary click', () => {
    const mockCb = jest.fn();
    const wrapper = mount(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={mockCb}
      />
    );

    wrapper
      .find('[aria-label="суббота, 20 января 2018 г."]')
      .first()
      .simulate('click');

    expect(mockCb.mock.calls.length).toBe(1);
    expect(mockCb.mock.calls[0][0]).toBe('2018-01-20');
  });

  it('days previous to dateCurrent should not be clickable', () => {
    const mockCb = jest.fn();
    const wrapper = mount(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={mockCb}
      />
    );

    wrapper
      .find('[aria-label="Not available. воскресенье, 7 января 2018 г."]')
      .first()
      .simulate('click');

    expect(mockCb.mock.calls.length).toBe(0);
  });

  it('should add _open modifier onClick DatePicker-Date', () => {
    const mockCb = jest.fn();
    const wrapper = mount(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
        onDatePick={mockCb}
      />
    );

    expect(wrapper.hasClass('DatePicker_open')).toBe(false);

    wrapper
      .find('.DatePicker-Date')
      .first()
      .simulate('click');

    expect(wrapper.find('.DatePicker')
      .getDOMNode()
      .classList
      .toString()
    ).toBe('DatePicker DatePicker_open');
  });

  it('should close the calendar if the date is chosen', () => {
    const mockCb = jest.fn();
    const wrapper = mount(
      <DatePicker
        dateCurrent={new Date('2018-02-09')}
        dateChosen={new Date('2018-02-09')}
        onDatePick={mockCb}
      />
    );

    wrapper
      .find('.DatePicker-Date')
      .first()
      .simulate('click');

    expect(wrapper.find('.DatePicker')
      .getDOMNode()
      .classList
      .toString()
    ).toBe('DatePicker DatePicker_open');

    wrapper
      .find('[aria-label="вторник, 20 февраля 2018 г."]')
      .first()
      .simulate('click');

    expect(mockCb.mock.calls.length).toBe(1);

    expect(wrapper.find('.DatePicker')
      .getDOMNode()
      .classList
      .toString()
    ).toBe('DatePicker');
  });
});

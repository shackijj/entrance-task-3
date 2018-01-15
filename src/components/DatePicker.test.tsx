import * as React from 'react';
import DatePicker from './DatePicker';
import { shallow } from 'enzyme';
import RountButton from './RoundButton';

describe('DatePicker', () => {
  it('should be a div with DatePicker class', () => {
    const wrapper = shallow(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-10')}
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
      />
    );

    expect(wrapper.find('.DatePicker-Date').text()).toEqual('10 янв');
  });

  it('should add TODAY if dateCurrent and dateChosen has the same date', () => {
    const wrapper = shallow(
      <DatePicker
        dateCurrent={new Date('2018-01-09')}
        dateChosen={new Date('2018-01-09')}
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

  it('should fire when date on calendar is clicked');
});

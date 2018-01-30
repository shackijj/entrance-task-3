import * as React from 'react';
import * as moment from 'moment';
import DateIntervalInput from './DateIntervalInput';
import { mount } from 'enzyme';

describe('DateIntervalInput', () => {
  it('should take dateStart and dateEnd in UTC and show it in user\'s timezone', () => {
    const dateStart = '2018-01-09T07:00:00.000Z';
    const dateEnd = '2018-01-09T07:15:00.000Z';

    const wrapper = mount(
      <DateIntervalInput
        dateStart={dateStart}
        dateEnd={dateEnd}
      />);

    const expectedDate = moment(dateStart).format('D MMMM, YYYY');
    const expectedStart = moment(dateStart).format('HH:mm');
    const expectedEnd = moment(dateEnd).format('HH:mm');

    const dateInput = wrapper.find('.DateIntervalInput-DateInput input').getDOMNode() as HTMLInputElement;
    expect(dateInput.value).toEqual(expectedDate);

    const startInput = wrapper.find('.DateIntervalInput-TimeStartInput input').getDOMNode() as HTMLInputElement;
    expect(startInput.value).toEqual(expectedStart);

    const endInput = wrapper.find('.DateIntervalInput-TimeEndInput input').getDOMNode() as HTMLInputElement;
    expect(endInput.value).toEqual(expectedEnd);
  });

  it('should show the DatePicker when DateIntervalInput-Date is focused', () => {
    const dateStart = '2018-01-09T07:00:00.000Z';
    const dateEnd = '2018-01-09T07:15:00.000Z';

    const wrapper = mount(
      <DateIntervalInput
        dateStart={dateStart}
        dateEnd={dateEnd}
      />);

    expect(wrapper.find('.DateIntervalInput-Calendar').hasClass('DateIntervalInput-Calendar_open')).toBeFalsy();

    wrapper.find('.DateIntervalInput-DateInput input').simulate('focus');

    expect(wrapper.find('.DateIntervalInput-Calendar').hasClass('DateIntervalInput-Calendar_open')).toBeTruthy();
  });

  it('should fire onChange when date changes', () => {
    const dateStart = '2018-02-09T07:00:00.000Z';
    const dateEnd = '2018-02-09T07:15:00.000Z';
    const mock = jest.fn();

    const wrapper = mount(
      <DateIntervalInput
        dateCurrent={dateStart}
        onChange={mock}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />);

    wrapper.find('[aria-label="вторник, 20 февраля 2018 г."]').simulate('click');
    expect(mock).toBeCalledWith('2018-02-20T07:00:00.000Z', '2018-02-20T07:15:00.000Z');
  });

  it('should fire onChange when timeStart changes', () => {
    const dateStart = '2018-01-09T07:00:00.000Z';
    const dateEnd = '2018-01-09T07:15:00.000Z';
    const mock = jest.fn();

    const wrapper = mount(
      <DateIntervalInput
        dateCurrent={dateStart}
        onChange={mock}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />);

    wrapper
      .find('.DateIntervalInput-TimeStartInput input')
      .simulate('change', {target: {value: '07:12'}});

    const duration = moment.duration('07:12');
    const start = moment(dateStart).startOf('day').add(duration);
    const end = moment(dateEnd);

    expect(mock).toBeCalledWith(start.toISOString(), end.toISOString());
  });

  it('should fire onChange when timeEnd changes', () => {
    const dateStart = '2018-01-09T07:00:00.000Z';
    const dateEnd = '2018-01-09T07:15:00.000Z';
    const mock = jest.fn();

    const wrapper = mount(
      <DateIntervalInput
        dateCurrent={dateStart}
        onChange={mock}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />);

    wrapper
      .find('.DateIntervalInput-TimeEndInput input')
      .simulate('change', {target: {value: '21:00'}});

    const duration = moment.duration('21:00');
    const start = moment(dateStart);
    const end = moment(dateEnd).startOf('day').add(duration);

    expect(mock).toBeCalledWith(start.toISOString(), end.toISOString());
  });

  it('should not fire onChange when timeEnd is not a duration string', () => {
    const dateStart = '2018-01-09T07:00:00.000Z';
    const dateEnd = '2018-01-09T07:15:00.000Z';
    const mock = jest.fn();

    const wrapper = mount(
      <DateIntervalInput
        dateCurrent={dateStart}
        onChange={mock}
        dateStart={dateStart}
        dateEnd={dateEnd}
      />);

    wrapper
      .find('.DateIntervalInput-TimeEndInput input')
      .simulate('change', {target: {value: 'asd'}});

    expect(mock).toHaveBeenCalledTimes(0);
  });
});

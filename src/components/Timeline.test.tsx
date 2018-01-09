import * as React from 'react';
import Timeline from './Timeline';
import { shallow } from 'enzyme';

describe('Timeline', () => {
  it('should render hours for a day', () => {
    const wrapper = shallow(<Timeline/>);
    expect(wrapper.find('.Timeline-Hour')).toHaveLength(24);
  });

  it('should render current time if it is giver', () => {
    const currentTime = new Date('2018-01-09T07:53:09.55');
    const wrapper = shallow(<Timeline currentTime={currentTime}/>);
    expect(wrapper.find('.Timeline-Hour')).toHaveLength(24);
    expect(wrapper.find('.Timeline-CurrentTime').text()).toEqual('7:53');
  });

  it('should zero fill minutes', () => {
    const currentTime = new Date('2018-01-09T07:03:09.55');
    const wrapper = shallow(<Timeline currentTime={currentTime}/>);
    expect(wrapper.find('.Timeline-Hour')).toHaveLength(24);
    expect(wrapper.find('.Timeline-CurrentTime').text()).toEqual('7:03');
  });
});
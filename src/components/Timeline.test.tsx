import * as React from 'react';
import Timeline from './Timeline';
import { shallow } from 'enzyme';

describe('Timeline', () => {
  it('should render hours for a day', () => {
    const wrapper = shallow(<Timeline hourStart={0} hourEnd={23}/>);
    expect(wrapper.find('.Timeline-Hour')).toHaveLength(23);
  });

  it('should render current time if it is giver', () => {
    const currentTime = new Date('2018-01-09T07:53:09.55');
    const wrapper = shallow(<Timeline hourStart={0} hourEnd={23} currentTime={currentTime}/>);
    expect(wrapper.find('.Timeline-Hour')).toHaveLength(23);
    expect(wrapper.find('.Timeline-CurrentTime').text()).toEqual('7:53');
  });

  it('should zero fill minutes', () => {
    const currentTime = new Date('2018-01-09T07:03:09.55');
    const wrapper = shallow(<Timeline hourStart={0} hourEnd={23} currentTime={currentTime}/>);
    expect(wrapper.find('.Timeline-Hour')).toHaveLength(23);
    expect(wrapper.find('.Timeline-CurrentTime').text()).toEqual('7:03');
  });

  it('current time should not be rendered if current time is less than hourStart', () => {
    const currentTime = new Date('2018-01-09T06:00:00.55');
    const wrapper = shallow(<Timeline currentTime={currentTime} hourStart={7} hourEnd={23}/>);
    expect(wrapper.find('.Timeline-CurrentTime')).toHaveLength(0);
  });

  it('current time should not be rendered if current time is more than hourStart', () => {
    const currentTime = new Date('2018-01-09T22:00:00.55');
    const wrapper = shallow(<Timeline currentTime={currentTime} hourStart={7} hourEnd={21}/>);
    expect(wrapper.find('.Timeline-CurrentTime')).toHaveLength(0);
  });

  it('should set an offset for current date according to its value', () => {
    const currentTime = new Date('2018-01-09T01:00:00.55');
    const wrapper = shallow(<Timeline currentTime={currentTime} hourStart={0} hourEnd={23}/>);
    expect(wrapper.find('.Timeline-CurrentTime').prop('style')).toEqual({
      left: '4.166667%'
    });
  });

  it('should set an offset for current time according to hourStart and hourEnd', () => {
    const currentTime = new Date('2018-01-09T10:00:00.55');
    const wrapper = shallow(<Timeline currentTime={currentTime} hourStart={8} hourEnd={10}/>);
    expect(wrapper.find('.Timeline-CurrentTime').prop('style')).toEqual({
      left: '66.666667%'
    });
  });

  it('should mark passed hours', () => {
    const currentTime = new Date('2018-01-09T02:00:00.55');
    const wrapper = shallow(<Timeline currentTime={currentTime} hourStart={0} hourEnd={23}/>);
    expect(wrapper.find('.Timeline-Hour_passed')).toHaveLength(2);
  });
});

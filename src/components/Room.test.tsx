import * as React from 'react';
import { shallow } from 'enzyme';
import Room from './Room';

describe('Room', () => {
  it('should render a room', () => {
    const wrapper = shallow(<Room title="Foo" description="Bar"/>);
    expect(wrapper.find('.Room-Title').text()).toEqual('Foo');
    expect(wrapper.find('.Room-Description').text()).toEqual('Bar');
  });

  it('should change add _hover modifier depening on isHovered prop', () => {
    const wrapper = shallow(<Room isHovered={true} title="Foo" description="Bar"/>);
    expect(wrapper.find('.Room').hasClass('Room_hover')).toEqual(true);
  });

  it('should change add _pressed modifier depening on isPressed prop', () => {
    const wrapper = shallow(<Room isPressed={true} title="Foo" description="Bar"/>);
    expect(wrapper.find('.Room').hasClass('Room_pressed')).toEqual(true);
  });

  it('should change add _disabled modifier depening on isPressed prop', () => {
    const wrapper = shallow(<Room isDisabled={true} title="Foo" description="Bar"/>);
    expect(wrapper.find('.Room').hasClass('Room_disabled')).toEqual(true);
  });
});
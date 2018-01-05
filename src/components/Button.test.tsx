import * as React from 'react';
import Button from './Button';
import { shallow } from 'enzyme';

describe('Button', () => {
  it('should has Button class', () => {
    const wrapper = shallow(<Button text="Foo"/>);
    const a = wrapper.find('a');
    expect(a.hasClass('Button')).toEqual(true);
  });

  it('should change class depending on classes prop', () => {
    const wrapper = shallow(<Button text="Foo" classes={['Test', 'Fest']}/>);
    const a = wrapper.find('a');
    expect(a.hasClass('Button Test Fest')).toEqual(true);
  });

  it('should change innerText depending on text prop', () => {
    const wrapper = shallow(<Button text="Foo"/>);
    const a = wrapper.find('a');
    expect(a.text()).toEqual('Foo');
  });
});

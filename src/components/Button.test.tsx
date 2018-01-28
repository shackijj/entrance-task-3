import * as React from 'react';
import Button from './Button';
import { shallow } from 'enzyme';

describe('Button', () => {
  it('should has Button class', () => {
    const wrapper = shallow(<Button/>);
    const a = wrapper.find('a');
    expect(a.hasClass('Button')).toEqual(true);
  });

  it('should change class depending on classes prop', () => {
    const wrapper = shallow(<Button classes={['Test', 'Fest']}/>);
    const a = wrapper.find('a');
    expect(a.hasClass('Button Test Fest')).toEqual(true);
  });

  it('should change innerText depending on text prop', () => {
    const wrapper = shallow(<Button>Foo</Button>);
    const a = wrapper.find('a');
    expect(a.text()).toEqual('Foo');
  });

  it('should add Button_disabled class dependeing on prop', () => {
    const wrapper = shallow(<Button disabled={true}>Foo</Button>);
    const a = wrapper.find('a');
    expect(a.hasClass('Button Button_disabled')).toEqual(true);
  });

  it('should be clickable if callback is given', () => {
    const mock = jest.fn();
    const wrapper = shallow(<Button onClick={mock}>Foo</Button>);
    wrapper.simulate('click');

    expect(mock).toHaveBeenCalledTimes(1);
  });
});

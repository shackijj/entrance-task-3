import * as React from 'react';
import Logo from './Logo';
import { shallow } from 'enzyme';

describe('Logo', () => {
  it('should has class logo by default', () => {
      const wrapper = shallow(<Logo/>);
      const div = wrapper.find('div');
      expect(div.hasClass('Logo')).toEqual(true);
  });

  it('should has class logo and classes given in classes prop', () => {
    const wrapper = shallow(<Logo classes={['Foo', 'Bar']}/>);
    const div = wrapper.find('div');
    expect(div.hasClass('Logo Foo Bar')).toEqual(true);
  });
});

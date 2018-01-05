import * as React from 'react';
import { shallow } from 'enzyme';
import GlyphIcon from './GlyphIcon';

describe('GlyphIcon', () => {
  it('should have class GlyphIcon', () => {
    const wrapper = shallow(<GlyphIcon/>);
    const span = wrapper.find('span');
    expect(span.hasClass('GlyphIcon')).toEqual(true);
  });
  it('should have className depenging on classes prop', () => {
    const wrapper = shallow(<GlyphIcon classes={['Foo', 'Bar']}/>);
    const span = wrapper.find('span');
    expect(span.hasClass('GlyphIcon Foo Bar')).toEqual(true);
  });
});

import * as React from 'react';
import { ArrowLeft, ArrowRight, Calendar, Close, Edit } from './GlyphIcon';
import { shallow } from 'enzyme';

describe('GlyphIcon', () => {
  it('should have ArrowLeft  icon', () => {
    const wrapper = shallow(<ArrowLeft />);
    expect(wrapper.html()).toEqual('<span class="GlyphIcon GlyphIcon_ArrowLeft"></span>');
  });
  it('should have ArrowRight icon', () => {
    const wrapper = shallow(<ArrowRight/>);
    expect(wrapper.html()).toEqual('<span class="GlyphIcon GlyphIcon_ArrowRight"></span>');
  });
  it('should have Calendar icon', () => {
    const wrapper = shallow(<Calendar/>);
    expect(wrapper.html()).toEqual('<span class="GlyphIcon GlyphIcon_Calendar"></span>');
  });
  it('should have Close icon', () => {
    const wrapper = shallow(<Close/>);
    expect(wrapper.html()).toEqual('<span class="GlyphIcon GlyphIcon_Close"></span>');
  });
  it('should have Edit  icon', () => {
    const wrapper = shallow(<Edit />);
    expect(wrapper.html()).toEqual('<span class="GlyphIcon GlyphIcon_Edit"></span>');
  });
});

import * as React from 'react';
import DatePicker from './DatePicker';
import { shallow } from 'enzyme';

describe('DatePicker', () => {
  it('should be a div with DatePicker class', () => {
    const wrapper = shallow(<DatePicker formattedDate="Something"/>);
    expect(wrapper.find('div.DatePicker')).toHaveLength(1);
  });

  it('should change class attr depending on classes prop', () => {
    const wrapper = shallow(<DatePicker classes={['Test']} formattedDate="Something"/>);
    const div = wrapper.find('div.DatePicker');
    expect(div.hasClass('DatePicker Test')).toEqual(true);
  });
});

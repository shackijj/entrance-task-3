import * as React from 'react';
import DatePicker from './DatePicker';
import { shallow } from 'enzyme';

describe('DatePicker', () => {
  it('should be a div with DatePicker class', () => {
    const wrapper = shallow(<DatePicker formattedDate="Something"/>);
    expect(wrapper.find('div.DatePicker')).toHaveLength(1);
  });
});

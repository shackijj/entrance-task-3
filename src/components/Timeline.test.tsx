import * as React from 'react';
import Timeline from './Timeline';
import { shallow } from 'enzyme';

describe('Timeline', () => {
  it('should render hours for a day', () => {
    const wrapper = shallow(<Timeline/>);
    expect(wrapper.find('.Timeline-Hour')).toHaveLength(23);
  });
});
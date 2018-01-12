import * as React from 'react';
import { shallow } from 'enzyme';
import RoundButton from './RoundButton';

describe('RoundButton', () => {
  const DummyElement = () => (<span>Dummy</span>);

  it('should have class RoundButton', () => {
    const wrapper = shallow(<RoundButton icon={<DummyElement/>}/>);
    expect(wrapper.html()).toEqual(
      '<a class="RoundButton"><span class="RoundButton-Icon"><span>Dummy</span></span></a>');
  });
  it('should have className depenging on classes prop', () => {
    const wrapper = shallow(<RoundButton icon={<DummyElement/>} classes={['Foo', 'Bar']}/>);
    const a = wrapper.find('a');
    expect(a.hasClass('RoundButton Foo Bar')).toEqual(true);
  });
});

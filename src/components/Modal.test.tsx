import * as React from 'react';
import Modal from './Modal';
import { shallow } from 'enzyme';

describe('Modal', () => {
  it('should render childen elements', () => {
    const actual = shallow(<Modal isOpen={false}>Test</Modal>);
    const expected = (
      <div className="Modal">
        <div className="Modal-Content">
          Test
        </div>
      </div>
    );
    expect(actual.matchesElement(expected)).toBeTruthy();
  });

  it('should add _open modifier depending on isOpen prop', () => {
    expect(shallow(<Modal isOpen={false}/>)
      .find('.Modal_open')).toHaveLength(0);
    expect(shallow(<Modal isOpen={true}/>)
      .find('.Modal_open')).toHaveLength(1);
  });
});
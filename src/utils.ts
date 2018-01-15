import { compose } from 'redux';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

export const shallowExpect = compose(expect, toJSON, shallow);
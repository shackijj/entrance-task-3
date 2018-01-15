import { compose } from 'redux';
import { shallow } from 'enzyme';
import * as toJSON from 'enzyme-to-json';

export const shallowExpect = compose(expect, toJSON.default, shallow);
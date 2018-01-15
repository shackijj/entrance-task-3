import { compose } from 'redux';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

export default compose(expect, toJSON, shallow);
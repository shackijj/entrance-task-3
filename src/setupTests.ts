// https://github.com/facebookincubator/create-react-app/issues/3199
import 'raf/polyfill';

import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import './setupLocale';

configure({ adapter: new Adapter() });
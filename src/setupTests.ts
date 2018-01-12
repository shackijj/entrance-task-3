import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as moment from 'moment';
moment.locale('ru');

configure({ adapter: new Adapter() });
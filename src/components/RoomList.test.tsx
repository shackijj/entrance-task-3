import * as React from 'react';
import RoomList from './RoomList';
import { shallow } from 'enzyme';

describe('RoomList', () => {
  it('should be an unordered list of rooms', () => {
    const title = '4 этаж';
    const rooms = [
      {title: 'BooZoo', capacity: '3 - 6 человек'},
      {title: 'FooRoo', capacity: '3 - 6 человек'},
    ];
    const wrapper = shallow(<RoomList rooms={rooms} title={title}/>);
    const items = wrapper.find('.RoomList-Item');
    const titleElement = wrapper.find('.RoomList-Title');

    expect(wrapper.find('div.RoomList')).toHaveLength(1);
    expect(titleElement.text()).toEqual('4 этаж');
    expect(items).toHaveLength(2);
  });
});

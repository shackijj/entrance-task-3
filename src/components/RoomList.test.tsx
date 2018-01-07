import * as React from 'react';
import RoomList from './RoomList';
import { shallow } from 'enzyme';

describe('RoomList', () => {
  it('should be a list of rooms', () => {
    const title = '4 этаж';
    const rooms = [
      {title: 'BooZoo', capacity: '3 - 6 человек'},
      {title: 'FooZoo', capacity: '6 человек'},
    ];
    const actual = shallow(<RoomList rooms={rooms} title={title}/>).html();
    const expected = shallow(
      <div className="RoomList">
        <h3 className="RoomList-Title">4 этаж</h3>
        <div className="RoomList-Item">
          <div className="RoomList-ItemTitle">
            BooZoo
          </div>
          <div className="RoomList-ItemDescription">
            3 - 6 человек
          </div>
        </div>
        <div className="RoomList-Item">
          <div className="RoomList-ItemTitle">
            FooZoo
          </div>
          <div className="RoomList-ItemDescription">
            6 человек
          </div>
        </div>
      </div>
    ).html();

    expect(actual).toEqual(expected);
  });
});

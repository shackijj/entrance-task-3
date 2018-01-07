import * as React from 'react';
import RoomGroupList from './RoomGroupList';
import { shallow } from 'enzyme';

describe('RoomList', () => {
  it('should be a list of rooms', () => {
    const groups = [
      {
        title: '4 этаж',
        rooms: [
          {title: 'Boo', description: '1 человек'},
          {title: 'Foo', description: '2 человек'},
        ],
      },
      {
        title: '5 этаж',
        rooms: [
          {title: 'Zoo', description: '3 человек'},
          {title: 'Moo', description: '4 человек'},
        ],
      }
    ];
    const actual = shallow(<RoomGroupList groups={groups}/>).html();
    const expected = shallow(
      <div className="RoomGroupList">
        <div className="RoomGroupList-Group">
          <h3 className="RoomGroupList-GroupTitle">4 этаж</h3>
          <div className="RoomGroupList-GroupItem">
            <div className="RoomGroupList-GroupItemTitle">
              Boo
            </div>
            <div className="RoomGroupList-GroupItemDescription">
              1 человек
            </div>
          </div>
          <div className="RoomGroupList-GroupItem">
            <div className="RoomGroupList-GroupItemTitle">
              Foo
            </div>
            <div className="RoomGroupList-GroupItemDescription">
              2 человек
            </div>
          </div>
        </div>
        <div className="RoomGroupList-Group">
          <h3 className="RoomGroupList-GroupTitle">5 этаж</h3>
          <div className="RoomGroupList-GroupItem">
            <div className="RoomGroupList-GroupItemTitle">
              Zoo
            </div>
            <div className="RoomGroupList-GroupItemDescription">
              3 человек
            </div>
          </div>
          <div className="RoomGroupList-GroupItem">
            <div className="RoomGroupList-GroupItemTitle">
              Moo
            </div>
            <div className="RoomGroupList-GroupItemDescription">
              4 человек
            </div>
          </div>
        </div>
      </div>
    ).html();

    expect(actual).toEqual(expected);
  });
});

import * as React from 'react';
import RoomGroupList, { RoomGroup } from './RoomGroupList';
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

  it('should change className depending on classes prop', () => {
    const groups: RoomGroup[] = [];
    const wrapper = shallow(<RoomGroupList classes={['Test']} groups={groups}/>);
    const div = wrapper.find('div.RoomGroupList');
    expect(div.hasClass('RoomGroupList Test')).toEqual(true);
  });

  it('should change GroupItem class attr depending on rooms props', () => {
    const groups = [
      {
        title: '4 этаж',
        rooms: [
          {
            title: 'Boo',
            description: '1 человек',
            isHovered: true,
            isPressed: false,
            isDisabled: false,
          },
          {
            title: 'Zoo',
            description: '1 человек',
            isHovered: false,
            isPressed: true,
            isDisabled: false,
          },
          {
            title: 'Moo',
            description: '1 человек',
            isHovered: true,
            isPressed: false,
            isDisabled: true,
          },
        ],
      },
    ];
    const wrapper = shallow(<RoomGroupList classes={['Test']} groups={groups}/>);
    const items = wrapper.find('.RoomGroupList-GroupItem');
    shallow(items.get(0)).find('.RoomGroupList-GroupItem');
    expect(firstItem.hasClass('RoomGroupList-GroupItem_hover')).toEqual(true);
 });
});

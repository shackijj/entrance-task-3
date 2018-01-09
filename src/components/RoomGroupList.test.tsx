import * as React from 'react';
import RoomGroupList from './RoomGroupList';
import { shallow } from 'enzyme';

const roomGroups = [
  {
    title: '7 этаж',
    rooms: [
      {
        title: 'Ржавый Фред',
        description: '3 - 6 человек',

      },
      {
        title: 'Прачечная',
        description: 'до 10 человек',

      },
    ]
  },
];
const DummyComponent: React.SFC<{title: string}> = ({title}) => (
  <div className="dummyRoom">{title}</div>
);
describe('RoomGroupList', () => {
  it('should render room groups', () => {

    const wrapper = shallow(
      <RoomGroupList
        RoomComponent={DummyComponent}
        groups={roomGroups}
      />
    );
    expect(wrapper.find(DummyComponent)).toHaveLength(2);
  });

  it('should change className depending on classes prop', () => {
    const wrapper = shallow(
    <RoomGroupList
      RoomComponent={DummyComponent}
      classes={['Test']}
      groups={roomGroups}
    />);
    const div = wrapper.find('div.RoomGroupList');
    expect(div.hasClass('RoomGroupList Test')).toEqual(true);
  });
});

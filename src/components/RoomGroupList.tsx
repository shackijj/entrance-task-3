import * as React from 'react';

interface Room {
  title: string;
  description: string;
}

interface RoomGroup {
  title: string;
  rooms: Room[];
}

interface RoomListProps {
  groups: RoomGroup[];
}

const RoomList: React.SFC<RoomListProps> = ({groups}) => (
  <div className="RoomGroupList">
    {groups.map(({title, rooms}, groupKey) => (
      <div key={groupKey} className="RoomGroupList-Group">
        <h3 className="RoomGroupList-GroupTitle">{title}</h3>
        {rooms.map(({title: itemTitle, description}, itemKey) => (
          <div key={itemKey} className="RoomGroupList-GroupItem">
            <div className="RoomGroupList-GroupItemTitle">
              {itemTitle}
            </div>
            <div className="RoomGroupList-GroupItemDescription">
              {description}
            </div>
          </div>
        ))}
      </div>
      ))}
  </div>
);

export default RoomList;
import * as React from 'react';
import * as classNames from 'classnames';
import './RoomGroupList.css';

interface Room {
  title: string;
  description: string;
  isHovered?: boolean;
  isPressed?: boolean;
  isDisabled?: boolean;
}

export interface RoomGroup {
  title: string;
  rooms: Room[];
}

export interface RoomListProps {
  groups: RoomGroup[];
  classes?: string[];
}

const RoomGroupList: React.SFC<RoomListProps> = ({groups, classes}) => (
  <div className={classNames('RoomGroupList', classes)}>
    {groups.map(({title, rooms}, groupKey) => (
      <div key={groupKey} className="RoomGroupList-Group">
        <h3 className="RoomGroupList-GroupTitle">{title}</h3>
        {rooms.map(({title: itemTitle, description, isHovered, isPressed, isDisabled}, itemKey) => (
          <div
            key={itemKey} 
            className={classNames(['RoomGroupList-GroupItem', {
              'RoomGroupList-GroupItem_hover': isHovered,
              'RoomGroupList-GroupItem_pressed': isPressed,
              'RoomGroupList-GroupItem_disabled': isDisabled,
            }])}
          >
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

export default RoomGroupList;
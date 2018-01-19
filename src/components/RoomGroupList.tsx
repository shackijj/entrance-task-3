import * as React from 'react';
import * as classNames from 'classnames';
import './RoomGroupList.css';

export interface RoomGroup<RoomProps> {
  floor: number;
  rooms: RoomProps[];
}

interface RoomGroupListProps<RoomProps> {
  RoomComponent: React.SFC<RoomProps>;
  groups: RoomGroup<RoomProps>[];
  classes?: string[];
  showGroupTitle?: boolean;
}

function RoomGroupList<T>({
  groups, RoomComponent, classes, showGroupTitle = true}: RoomGroupListProps<T>) {
  return (
    <div className={classNames('RoomGroupList', classes)}>
      {groups &&
        groups.map(({floor, rooms}, groupKey) => (
        <div key={groupKey} className="RoomGroupList-Group">
          {showGroupTitle ? <h3 className="RoomGroupList-GroupTitle">{floor} этаж</h3> : ''}
          {rooms.map((room, itemKey) => {
            return <RoomComponent {...room} key={itemKey}/>;
          })}
        </div>
        ))}
    </div>
  );
}

export default RoomGroupList;
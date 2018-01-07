import * as React from 'react';

interface Room {
  title: string;
  description: string;
}

interface RoomListProps {
  title: string;
  rooms: Room[];
}

const RoomList: React.SFC<RoomListProps> = ({rooms, title}) => (
  <div className="RoomList">
    <h3 className="RoomList-Title">{title}</h3>
    {rooms.map(({title: roomTitle, description}, idx) => (
      <div key={idx} className="RoomList-Item">
        <div className="RoomList-ItemTitle">
          {roomTitle}
        </div>
        <div className="RoomList-ItemDescription">
          {description}
        </div>
      </div>
    ))}
  </div>
);

export default RoomList;
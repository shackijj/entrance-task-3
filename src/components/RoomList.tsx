import * as React from 'react';

interface Room {
  title: string;
  capacity: string;
}

interface RoomListProps {
  title: string;
  rooms: Room[];
}

const RoomList: React.SFC<RoomListProps> = ({rooms, title}) => (
  <div className="RoomList">
    <h3 className="RoomList-Title">{title}</h3>
    {rooms.map((room, idx) => (
      <div key={idx} className="RoomList-Item"/>
    ))}
  </div>
);

export default RoomList;
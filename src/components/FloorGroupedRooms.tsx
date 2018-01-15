import * as React from 'react';
import RoomGroupList from './RoomGroupList';
import Room from './Room';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const FEED_QUERY = gql`
query RoomQuery {
  rooms {
    title
    floor
    capacity
  }
}
`;

type Room = {
  title: string;
  floor: number;
  capacity: number;
};

type Response = {
  rooms: Room[];
};

const withRooms = graphql<Response, {classes?: string[]}>(FEED_QUERY);

const FloorGroupedRooms = withRooms(({classes, data: {error, loading, rooms}}) => {
  if (loading) {
    return <div>loading</div>;
  }
  
  if (error) {
    return <div>error</div>;
  }

  const groups = {};
  rooms.forEach((room) => {
    const { floor } = room;
    if (groups[floor]) {
      groups[floor].push(room);
    } else {
      groups[floor] = [room];
    }
  });

  let roomGroups = [];
  for (let key in groups) {
    if (groups.hasOwnProperty(key)) {
      roomGroups.push({
        title: key,
        rooms: groups[key]
      });
    }
  }

  return (
    <RoomGroupList
      RoomComponent={Room}
      classes={classes}
      groups={roomGroups}
    />
  );
});

export default FloorGroupedRooms;
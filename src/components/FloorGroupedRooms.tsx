import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const FEED_QUERY = gql`
query FloorGroupedRoomEvents($date: Date) {
  floors {
    floor
    rooms {
      title
      capacity
      events(filter: {onDate: $date}, sort: {field: "dateStart", order: DESC}) {
        dateStart
        dateEnd
      }
    }
  }
}
`;

type Event = {
  dateStart: string;
  dateEnd: string;
};

type Room = {
  title: string;
  floor: number;
  capacity: number;
  events: Event[];
};

type Floor = {
  floor: number;
  rooms: Room[]
};

type Response = {
  floors: Floor[];
};

const withRooms = graphql<Response, {classes?: string[]}>(FEED_QUERY, {
  options: () => ({
    variables: { date: new Date() }
  })
});

const FloorGroupedRooms = withRooms(({classes, data: {error, loading, floors}}) => {
  if (loading) {
    return <div>loading</div>;
  }
  
  if (error) {
    return <div>error</div>;
  }

  return <div>{JSON.stringify(floors, null, 2)}</div>;
});

export default FloorGroupedRooms;
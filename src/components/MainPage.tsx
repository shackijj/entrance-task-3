import Timeline from './Timeline';
import DatePicker from './DatePicker';
import RoomGroupList from './RoomGroupList';
import Room from './Room';
import RoomTimeline from './RoomTimeline';
import './MainPage.css';

import { RouteComponentProps, withRouter } from 'react-router';

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
        title
        dateStart
        dateEnd
        users {
          login
          avatarUrl
        }
      }
    }
  }
}
`;

type User = {
  login: string;
  avatarUrl: string;
};

type Event = {
  title: string;
  dateStart: string;
  dateEnd: string;
  users: User[];
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

interface MainPageProps {
  date: string;
}

const withFloors = graphql<Response, RouteComponentProps<MainPageProps>>(FEED_QUERY, {
  options: () => ({
    variables: { date: new Date() }
  })
});

const MainPage = withFloors(({data, history, match: {params: {date}}}) => (
  <div className="MainPage">
    <div className="MainPage-SubHeader"/>
    <DatePicker
      classes={['MainPage-DatePicker']}
      dateCurrent={new Date()}
      dateChosen={date === 'today' ? new Date() : new Date(date)}
      onDatePick={dateStr => history.push(`/events/${dateStr}`)}
    />
    <div className="MainPage-RoomEventListWrapper">
      <Timeline classes={['MainPage-Timeline']}/>
      <div className="MainPage-TimelineEvents">
        <RoomGroupList
          RoomComponent={Room}
          classes={['MainPage-RoomGroupList']}
          groups={data.floors}
        />
        <RoomGroupList
          RoomComponent={RoomTimeline}
          classes={['MainPage-RoomTimelineList']}
          groups={data.floors}
          showGroupTitle={false}
        />
      </div>
    </div>
  </div>
));

export default withRouter(MainPage);

import Timeline from './Timeline';
import DatePicker from './DatePicker';
import RoomGroupList from './RoomGroupList';
import Room from './Room';
import RoomTimeline from './RoomTimeline';
import './MainPage.css';
import * as moment from 'moment';

import { RouteComponentProps, withRouter } from 'react-router';

import * as React from 'react';
import { graphql, ChildProps } from 'react-apollo';
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

interface MainPageState {
  dateChosen: Date;
  dateCurrent: Date;
}

const withFloors = graphql<Response, RouteComponentProps<MainPageProps>>(FEED_QUERY, {
  options: () => ({
    variables: { date: new Date() }
  })
});

type MainPagePropsConnected = ChildProps<RouteComponentProps<MainPageProps>, Response>; 

class MainPage extends React.Component<MainPagePropsConnected, MainPageState> {
  constructor(props: MainPagePropsConnected) {
    const {match: {params: {date}}} = props;
    super(props);
    this.state = {
      dateChosen: date === 'today' ? new Date() : new Date(date),
      dateCurrent: new Date()
    };
  }
  componentWillReceiveProps({match: {params: {date}}}: MainPagePropsConnected) {
    this.setState({
      dateChosen: date === 'today' ? new Date() : new Date(date),
      dateCurrent: new Date()
    });
  }
  render() {
    const {data, history} = this.props;
    const {dateCurrent, dateChosen} = this.state;
    const isToday = moment(dateCurrent).isSame(dateChosen, 'day');
    return (
      <div className="MainPage">
        <div className="MainPage-SubHeader"/>
        <DatePicker
          classes={['MainPage-DatePicker']}
          dateCurrent={this.state.dateCurrent}
          dateChosen={this.state.dateChosen}
          onDatePick={dateStr => history.push(`/events/${dateStr}`)}
        />
        <div className="MainPage-RoomEventListWrapper">
          <Timeline
            currentTime={isToday ? dateCurrent : undefined}
            classes={['MainPage-Timeline']}
          />
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
    );
  }
}

export default withRouter(withFloors(MainPage));

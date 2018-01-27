import DatePicker from './DatePicker';
import EventDiagram from './EventsDiagram';
import './MainPage.css';

import { RouteComponentProps, withRouter } from 'react-router';

import * as React from 'react';
import { graphql, compose, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';

import * as moment from 'moment';

export const FEED_QUERY = gql`
query FloorGroupedRoomEvents($date: Date) {
  floors {
    floor
    rooms {
      id
      title
      capacity
      events(filter: {onDate: $date}, sort: {field: "dateStart", order: ASC}) {
        id
        dateStart
        dateEnd
      }
    }
  }
}
`;

export type User = {
  login: string;
  avatarUrl: string;
};

export type Event = {
  id: string;
  dateStart: string;
  dateEnd: string;
};

export type Room = {
  id: string;
  title: string;
  capacity: number;
  events: Event[];
};

export type Floor = {
  floor: number;
  rooms: Room[];
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

const propsToDate = ({match: {params: {date}}}: RouteComponentProps<MainPageProps>) => {
  return date === 'today' ? new Date() : new Date(date);
};

const withFloors = graphql<Response, RouteComponentProps<MainPageProps>>(FEED_QUERY, {
  options: (props) => ({
    variables: { date: propsToDate(props) }
  })
});

type MainPagePropsConnected = ChildProps<RouteComponentProps<MainPageProps>, Response>; 

class MainPage extends React.Component<MainPagePropsConnected, MainPageState> {
  constructor(props: MainPagePropsConnected) {
    super(props);
    this.state = {
      dateChosen: propsToDate(props),
      dateCurrent: new Date()
    };
  }
  componentWillReceiveProps(props: MainPagePropsConnected) {
    this.setState({
      dateChosen: propsToDate(props),
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
          dateCurrent={dateCurrent}
          dateChosen={dateChosen}
          onDatePick={dateStr => history.push(`/events/${dateStr}`)}
        />
        {data && data.floors &&
          <EventDiagram
            floors={data.floors}
            date={isToday ? dateCurrent.toISOString() : dateChosen.toISOString()}
            isDateCurrent={isToday}
            classes={['MainPage-EventsDiagram']}
          />
        }
      </div>
    );
  }
}

export default compose(
  withRouter,
  withFloors
)(MainPage);

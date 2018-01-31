import DatePicker from './DatePicker';
import EventDiagram from './EventsDiagram';
import Header from './Header';
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
    this._onDatePick = this._onDatePick.bind(this);
    this._onFreeSlotClick = this._onFreeSlotClick.bind(this);
    this._onCreateEventClick = this._onCreateEventClick.bind(this);
    this._onEditEventClick = this._onEditEventClick.bind(this);
  }
  componentWillReceiveProps(props: MainPagePropsConnected) {
    this.setState({
      dateChosen: propsToDate(props),
      dateCurrent: new Date()
    });
  }
  render() {
    const {data} = this.props;
    const {dateCurrent, dateChosen} = this.state;
    const isToday = moment(dateCurrent).isSame(dateChosen, 'day');
    return (
      <div className="MainPage">
        <Header
          isCreateButtonShown={true}
          onCreateButtonClick={this._onCreateEventClick}
        />
        <div className="MainPage-SubHeader"/>
        <DatePicker
          classes={['MainPage-DatePicker']}
          dateCurrent={dateCurrent}
          dateChosen={dateChosen}
          onDatePick={this._onDatePick}
        />
        {data && data.floors &&
          <EventDiagram
            floors={data.floors}
            date={isToday ? dateCurrent.toISOString() : dateChosen.toISOString()}
            isDateCurrent={isToday}
            classes={['MainPage-EventsDiagram']}
            onFreeSlotClick={this._onFreeSlotClick}
            onEventEditClick={this._onEditEventClick}
          />
        }
      </div>
    );
  }
  private _onDatePick(dateStr: string) {
    const { dateCurrent } = this.state;
    const { history } = this.props;

    if (moment(dateStr).isSameOrAfter(dateCurrent, 'day')) {
      history.push(`/events/${dateStr}`);
    }
  }
  private _onFreeSlotClick(roomId: string, dateStart: string, dateEnd: string) {
    this.props.history.push(`/create/${roomId}/${dateStart}/${dateEnd}`);
  }
  private _onCreateEventClick() {
    this.props.history.push(`/create`);
  }
  private _onEditEventClick(eventId: string) {
    this.props.history.push(`/edit/${eventId}`);
  }
}

export default compose(
  withRouter,
  withFloors
)(MainPage);

import * as React from 'react';
import Timeline from './Timeline';
import DatePicker from './DatePicker';
import './MainPage.css';

import { RouteComponentProps, withRouter } from 'react-router';
/*
import RoomGroupList, { RoomGroup } from './RoomGroupList';
import Room from './Room';
import RoomTimeline, { RoomTimelineProps } from './RoomTimeline';
function roomProps<T>(WrappedComponent: React.SFC<T>, sharedProps: {}) {
  return (props: T) => <WrappedComponent {...props} {...sharedProps}/>;
} 
*/

interface MainPageProps {
  date: string;
}

const MainPage: React.SFC<RouteComponentProps<MainPageProps>> = ({history, match: {params: {date}}}) => (
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
            {/*
          <RoomGroupList
            RoomComponent={Room}
            classes={['MainPage-RoomGroupList']}
            groups={roomGroups}
          />
          <RoomGroupList
            RoomComponent={roomProps(RoomTimeline, {dateCurrent: currentTime, hourStart, hourEnd})}
            classes={['MainPage-RoomTimelineList']}
            groups={roomGroups}
            showGroupTitle={false}
          /> */}
        </div>
      </div>
  </div>
);

export default withRouter(MainPage);

import * as React from 'react';
import DatePicker from './connected/DatePicker';
import Timeline from './connected/Timeline';
import './MainPage.css';
/*
import RoomGroupList, { RoomGroup } from './RoomGroupList';
import Room from './Room';
import RoomTimeline, { RoomTimelineProps } from './RoomTimeline';
function roomProps<T>(WrappedComponent: React.SFC<T>, sharedProps: {}) {
  return (props: T) => <WrappedComponent {...props} {...sharedProps}/>;
} 
*/

const MainPage: React.SFC =
  () => (
  <div className="MainPage">
    <div className="MainPage-SubHeader"/>
    <DatePicker
      classes={['MainPage-DatePicker']}
    />
    <div className="MainPage-RoomEventListWrapper">
      <Timeline classes={['MainPage-Timeline']}/>
        <div className="MainPage-TimelineEvents">
{/*           <RoomGroupList
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

export default MainPage;

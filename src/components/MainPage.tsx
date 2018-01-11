import * as React from 'react';
import Header from './Header';
import DatePicker from './DatePicker';
import Timeline from './Timeline';
import RoomGroupList, { RoomGroup } from './RoomGroupList';
import Room from './Room';
import RoomTimeline, { RoomTimelineProps } from './RoomTimeline';
import './MainPage.css';

function roomProps<T>(WrappedComponent: React.SFC<T>, sharedProps: {}) {
  return (props: T) => <WrappedComponent {...props} {...sharedProps}/>;
}

interface MainPageProps {
    formattedDate: string;
    roomGroups: RoomGroup<RoomTimelineProps>[];
    currentTime?: Date;
    hourStart: number;
    hourEnd: number;
}

const MainPage: React.SFC<MainPageProps> = ({formattedDate, roomGroups, currentTime, hourStart, hourEnd}) => (
  <div className="MainPage">
      <Header/>
      <div className="MainPage-DatePickerWrapper">
          <DatePicker
              classes={['MainPage-DatePicker']}
              formattedDate={formattedDate}
          />
      </div>
      <div className="MainPage-RoomGroupListWrapper">
          <RoomGroupList
              RoomComponent={Room}
              classes={['MainPage-RoomGroupList']}
              groups={roomGroups}
          />
      </div>
      <div className="MainPage-RoomEventListWrapper">
          <Timeline currentTime={currentTime} hourStart={hourStart} hourEnd={hourEnd}/>
          <RoomGroupList
            RoomComponent={roomProps(RoomTimeline, {dateCurrent: currentTime, hourStart, hourEnd})}
            classes={['MainPage-RoomTimelineList']}
            groups={roomGroups}
            showGroupTitle={false}
          />
      </div>
  </div>
);

export default MainPage;

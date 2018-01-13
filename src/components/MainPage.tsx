import * as React from 'react';
import DatePicker from './DatePicker';
import Timeline from './Timeline';
import RoomGroupList, { RoomGroup } from './RoomGroupList';
import Room from './Room';
import RoomTimeline, { RoomTimelineProps } from './RoomTimeline';
import './MainPage.css';

import Popup from './Popup';
import Modal from './Modal';
import Button from './Button';
import Header from './Header';

function roomProps<T>(WrappedComponent: React.SFC<T>, sharedProps: {}) {
  return (props: T) => <WrappedComponent {...props} {...sharedProps}/>;
}

interface MainPageProps {
    formattedDate: string;
    roomGroups: RoomGroup<RoomTimelineProps>[];
    currentTime?: Date;
    showCalendar: boolean;
    modalOpen?: boolean;
    hourStart: number;
    hourEnd: number;
}

const MainPage: React.SFC<MainPageProps> =
  ({formattedDate, roomGroups, currentTime, hourStart, hourEnd, showCalendar, modalOpen = false}) => (
  <div className="MainPage">
    <Header/>
    <div className="MainPage-SubHeader"/>
    <DatePicker
      formattedDate={formattedDate}
      showCalendar={showCalendar}
      classes={['MainPage-DatePicker']}
    />
    <div className="MainPage-RoomEventListWrapper">
      <Timeline
        classes={['MainPage-Timeline']}
        currentTime={currentTime}
        hourStart={hourStart} 
        hourEnd={hourEnd}
      />
      <div className="MainPage-TimelineEvents">
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
        />
      </div>
    </div>
    <Modal isOpen={modalOpen}>
      <Popup
        emoji="🎉"
        message="Встреча создана!"
        details={<span>14 декабря, 15:00—17:00<br/>Готем · 4 этаж</span>}
        buttons={[<Button key="1" classes={['Button_theme_create']}>Хорошо</Button>]}
      />
    </Modal>
  </div>
);

export default MainPage;

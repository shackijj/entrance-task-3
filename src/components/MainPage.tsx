import * as React from 'react';
import Header from './Header';
import DatePicker from './DatePicker';
import Timeline from './Timeline';
import RoomGroupList, { RoomGroup } from './RoomGroupList';
import './MainPage.css';

interface MainPageProps {
    formattedDate: string;
    roomGroups: RoomGroup[];
    currentTime?: Date;
}

const MainPage: React.SFC<MainPageProps> = ({formattedDate, roomGroups, currentTime}) => (
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
                classes={['MainPage-RoomGroupList']}
                groups={roomGroups}
            />
        </div>
        <div className="MainPage-RoomEventListWrapper">
            <Timeline currentTime={currentTime}/>
        </div>
    </div>
);

export default MainPage;

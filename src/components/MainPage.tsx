import * as React from 'react';
import Header from './Header';
import DatePicker from './DatePicker';
import RoomGroupList, { RoomGroup } from './RoomGroupList';
import './MainPage.css';

interface MainPageProps {
    formattedDate: string;
    roomGroups: RoomGroup[];
}

const MainPage: React.SFC<MainPageProps> = ({formattedDate, roomGroups}) => (
    <div className="MainPage">
        <Header/> 
        <DatePicker
            classes={['MainPage-DatePicker']}
            formattedDate={formattedDate}
        />
        <div className="MainPage-RoomGroupListWrapper">
            <RoomGroupList
                classes={['MainPage-RoomGroupList']}
                groups={roomGroups}
            />
        </div>
    </div>
);

export default MainPage;

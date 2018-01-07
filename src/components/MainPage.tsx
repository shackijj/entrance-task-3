import * as React from 'react';
import Header from './Header';
import DatePicker from './DatePicker';
import './MainPage.css';

interface MainPageProps {
    formattedDate: string;
}

const MainPage: React.SFC<MainPageProps> = ({formattedDate}) => (
    <div className="MainPage">
        <Header/> 
        <DatePicker
            classes={['MainPage-DatePicker']}
            formattedDate={formattedDate}
        />
    </div>
);

export default MainPage;

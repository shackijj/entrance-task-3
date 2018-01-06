import * as React from 'react';
import Header from './Header';
import DatePicker from './DatePicker';
import './MainPage.css';

const MainPage = () => (
    <div className="MainPage">
        <Header/> 
        <div className="MainPage-Aside">
            <DatePicker formattedDate="14 январа"/>
        </div>
    </div>
);

export default MainPage;

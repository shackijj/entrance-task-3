import * as React from 'react';
import Header from './Header';
import DatePicker from './DatePicker';
import './MainPage.css';

const MainPage = () => (
    <div className="MainPage">
        <Header/> 
        <DatePicker
            classes={['MainPage-DatePicker']}
            formattedDate="14 январа"
        />
    </div>
);

export default MainPage;

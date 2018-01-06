import * as React from 'react';
import Header from './Header';
import DatePicker from './DatePicker';

const MainPage = () => (
    <div className="MainPage">
        <Header/>
        <DatePicker formattedDate="14 январа"/>
    </div>
);

export default MainPage;

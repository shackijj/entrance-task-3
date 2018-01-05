import * as React from 'react';
import Logo from './Logo';
import Button from './Button';
import './Header.css';

const Header = () => (
    <div className="Header">
        <Logo classes={['Header-Logo']}/>
        <Button classes={['Header-Button']} text="Создать встречу"/>
    </div>
);

export default Header;

import * as React from 'react';
import Logo from './Logo';
import Button from './Button';
import './Header.css';

const Header = () => (
  <div className="Header">
      <Logo classes={['Header-Logo']}/>
      <Button classes={['Header-Button', 'Button_theme_create']}>
          Создать встречу
      </Button>
  </div>
);

export default Header;

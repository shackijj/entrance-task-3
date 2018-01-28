import * as React from 'react';
import Logo from './Logo';
import Button from './Button';
import './Header.css';

type HeaderProps = {
  onCreateButtonClick?: () => void;
  isCreateButtonShown?: boolean;
};

const Header: React.SFC<HeaderProps> = ({onCreateButtonClick, isCreateButtonShown}) => (
  <div className="Header">
    <Logo classes={['Header-Logo']}/>
    {isCreateButtonShown && 
      <Button
        onClick={onCreateButtonClick}
        classes={['Header-Button', 'Button_theme_create']}
      >
          Создать встречу
      </Button>
    }

  </div>
);

export default Header;

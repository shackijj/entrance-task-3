import * as React from 'react';
import User, { UserProps } from './User';
import { Close } from './GlyphIcon/GlyphIcon';
import './UserInput.css';

interface UserInputProps extends UserProps {
  onCloseClick?: () => void;
}

const UserInput: React.SFC<UserInputProps> = ({avatarUrl, login, onCloseClick}) => (
  <div className="UserInput">
    <User login={login} avatarUrl={avatarUrl}/>
    <Close classes={['UserInput-Close']} onClick={onCloseClick ? onCloseClick : undefined}/>
  </div>
);

export default UserInput;
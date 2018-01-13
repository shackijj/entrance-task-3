import * as React from 'react';
import User, { UserProps } from './User';
import { Close } from './GlyphIcon/GlyphIcon';
import './UserInput.css';

interface UserInputProps extends UserProps {}

const UserInput: React.SFC<UserInputProps> = ({avatarUrl, name}) => (
  <div className="UserInput">
    <User name={name} avatarUrl={avatarUrl}/>
    <Close classes={['UserInput-Close']}/>
  </div>
);

export default UserInput;
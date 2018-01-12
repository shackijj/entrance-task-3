import * as React from 'react';

import './User.css';

export interface UserProps {
  name: string;
  avatarUrl: string;
}

const User = ({name, avatarUrl}: UserProps) => (
  <div className="User">
    <img className="User-Avatar" src={avatarUrl} />
    <span className="User-Name">{name}</span>
  </div>
);

export default User;

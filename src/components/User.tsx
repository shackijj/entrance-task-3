import * as React from 'react';

import './User.css';

export interface UserProps {
  login: string;
  avatarUrl: string;
}

const User = ({login, avatarUrl}: UserProps) => (
  <div className="User">
    <img className="User-Avatar" src={avatarUrl} />
    <span className="User-Name">{login}</span>
  </div>
);

export default User;

import * as React from 'react';
import User from './User';

import './UsersHint.css';

export type User = {
  firstName: string;
  secondName: string;
  avatarUrl: string;
  id: string;
  floor: {
    floor: number;
  };
};

export interface UsersHintProps {
  users: User[];
  onUserClick?: (user: User) => void;
}

const UsersHint: React.SFC<UsersHintProps> = ({users, onUserClick}) => (
  <div className="UsersHint">
    {users.map((user, idx) => (
      <div key={idx} className="UsersHint-User" onClick={onUserClick ? () => onUserClick(user) : undefined}>
        <User login={`${user.firstName} ${user.secondName}`} avatarUrl={user.avatarUrl}/>
        <div className="UsersHint-UserFloor">
          <span className="UsersHint-Separator"> · </span>{user.floor.floor} этаж
        </div>
      </div>
    ))}
  </div>
);

export default UsersHint; 
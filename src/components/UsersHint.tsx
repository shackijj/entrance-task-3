import * as React from 'react';
import User from './User';

import './UsersHint.css';

type User = {
  firstName: string;
  secondName: string;
  avatarUrl: string;
  id: string;
  floor: number;
};

interface UsersHintProps {
  users: User[];
  onUserClick?: (userId: string) => void;
}

const UsersHint: React.SFC<UsersHintProps> = ({users, onUserClick}) => (
  <div className="UsersHint">
    {users.map(({id, firstName, secondName, avatarUrl, floor}, idx) => (
      <div key={idx} className="UsersHint-User" onClick={onUserClick ? () => onUserClick(id) : undefined}>
        <User login={`${firstName} ${secondName}`} avatarUrl={avatarUrl}/>
        <div className="UsersHint-UserFloor"> · {floor} этаж</div>
      </div>
    ))}
  </div>
);

export default UsersHint; 
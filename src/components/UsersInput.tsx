import * as React from 'react';
import TextInput from './TextInput';
import UsersHints, { User } from './UsersHint';
import UserInput from './UserInput';

import './UsersInput.css';

interface UsersInputProps {
  usersHint: User[];
  users: User[];
  onUserAdd?: (userId: string) => void;
  onUserRemove?: (userId: string) => void;
  onInputChange?: (value: string) => void;
}

interface UsersInputState {
  inputValue: string;
  focused: boolean;
}

class UsersInput extends React.Component<UsersInputProps, UsersInputState> {
  constructor(props: UsersInputProps) {
    super(props);
    this.state = {
      inputValue: '',
      focused: false,
    };
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onUserAdd = this._onUserAdd.bind(this);
  }
  render() {
    const {usersHint, users, onUserRemove} = this.props;
    const {focused, inputValue} = this.state;
    return (
      <div className="UsersInput">
        <div className="UsersInput-Input">
          <TextInput
            label={'Участники'}
            value={inputValue}
            onFocus={this._onFocus}
            onBlur={this._onBlur}
            onChange={this._onInputChange}
          />
          {focused && usersHint.length > 0 &&
            <div className="UserInput-Hints">
              <UsersHints users={usersHint} onUserClick={this._onUserAdd}/>
            </div>
          }
        </div>
        <div className="UsersInput-Users">
          {users.map((user, idx) => (
            <UserInput
              key={idx}
              avatarUrl={user.avatarUrl}
              login={`${user.firstName} ${user.secondName}`}
              onCloseClick={onUserRemove ? () => onUserRemove(user.id) : undefined}
            />
          ))}
        </div>
      </div>
    );
  }
  private _onUserAdd(userId: string) {
    if (this.props.onUserAdd) {
      this.props.onUserAdd(userId);
    }
    const newState = Object.assign({}, this.state, {inputValue: ''});
    this.setState(newState);
  }
  private _onFocus() {
    const newState = Object.assign({}, this.state, {focused: true});
    this.setState(newState);
  }
  private _onBlur() {
    const newState = Object.assign({}, this.state, {focused: false});
    this.setState(newState);
  }
  private _onInputChange(inputValue: string) {
    const newState = Object.assign({}, this.state, {inputValue});
    this.setState(newState);
    if (this.props.onInputChange) {
      this.props.onInputChange(inputValue);
    }
  }
}

export default UsersInput;
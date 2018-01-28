import * as React from 'react';
import TextInput from './TextInput';
import UsersHints, { User } from './UsersHint';

interface UsersInputProps {
  usersHint: User[];
}

interface UsersInputState {
  focused: boolean;
  users: User[];
}

class UsersInput extends React.Component<UsersInputProps, UsersInputState> {
  constructor(props: UsersInputProps) {
    super(props);
    this.state = {
      focused: false,
      users: [],
    };
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
  }
  render() {
    const {usersHint} = this.props;
    const {focused} = this.state;
    return (
      <div className="UsersInput">
      <TextInput
        onFocus={this._onFocus}
        onBlur={this._onBlur}
      />
      {focused && usersHint.length > 0 &&
        <div className="UserInput-Hints">
          <UsersHints users={usersHint}/>
        </div>
      }
    </div>
    );
  }
  private _onFocus() {
    const newState = Object.assign({}, this.state, {focused: true});
    this.setState(newState);
  }
  private _onBlur() {
    const newState = Object.assign({}, this.state, {focused: false});
    this.setState(newState);
  }
}

export default UsersInput;
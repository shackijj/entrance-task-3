import * as React from 'react';
import TextInput from './TextInput';
import UsersHints, { User } from './UsersHint';
import UserInput from './UserInput';

import './UsersInput.css';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

interface UsersInputWrappedProps {
  users: User[];
  inputValue: string;
  onUserAdd?: (user: User) => void;
  onUserRemove?: (user: User) => void;
  onInputChange?: (value: string) => void;
}

interface UsersInputProps extends UsersInputWrappedProps {
  usersHint: User[];
}

interface UsersInputState {
  focused: boolean;
}

export class UsersInput extends React.Component<UsersInputProps, UsersInputState> {
  private _container: HTMLDivElement | null;
  constructor(props: UsersInputProps) {
    super(props);
    this.state = {
      focused: false,
    };
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onInputChange = this._onInputChange.bind(this);
    this._onUserAdd = this._onUserAdd.bind(this);
    this._onDocumentMouseDown = this._onDocumentMouseDown.bind(this);
    this._onContainerRef = this._onContainerRef.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this._onDocumentMouseDown);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this._onDocumentMouseDown);
  }
  render() {
    const {usersHint, users, onUserRemove, inputValue} = this.props;
    const {focused} = this.state;
    return (
      <div className="UsersInput" ref={this._onContainerRef}>
        <div className="UsersInput-Input">
          <TextInput
            label={'Участники'}
            value={inputValue}
            onFocus={this._onFocus}
            onChange={this._onInputChange}
            focused={focused}
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
              onCloseClick={onUserRemove ? () => onUserRemove(user) : undefined}
            />
          ))}
        </div>
      </div>
    );
  }
  private _onUserAdd(user: User) {
    if (this.props.onUserAdd) {
      this.props.onUserAdd(user);
    }
    const newState = Object.assign({}, this.state, {inputValue: '', focused: false});
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
    if (this.props.onInputChange) {
      this.props.onInputChange(inputValue);
    }
  }
  private _onContainerRef(div: HTMLDivElement) {
    if (div) {
      this._container = div;
    }
  }
  private _onDocumentMouseDown(event: MouseEvent) {
    const target = event.target as Node;
    if (this._container && !this._container.contains(target)) {
      this.setState(Object.assign({}, this.state, {focused: false}));
    }
  }
}

export const USERS_QUERY = gql`
query UsersQuery($nameContains: String) {
  users(filter: $nameContains) {
    id
    firstName
    secondName
    avatarUrl
    floor {
      floor
    }
  }
}
`;

type Response = {
  users: User[];
};

const withUsers = graphql<Response, UsersInputWrappedProps, UsersInputProps>(USERS_QUERY, {
  options: ({inputValue}) => ({
    variables: { nameContains: inputValue }
  }),
  props: ({ ownProps, data }) => {
    let usersHint: User[] = [];
    if (data && data.users) {
      usersHint = data.users;
    }
    return {
      usersHint,
      ...ownProps
    };
  },
});

export default withUsers(UsersInput);
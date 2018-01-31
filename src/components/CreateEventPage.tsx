import * as React from 'react';
import Button from './Button';
import RoundButton from './RoundButton';
import { Close } from './GlyphIcon/GlyphIcon';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import DateInvervalInput from './DateIntervalInput';
import UsersInputWithGQL from './UsersInput';
import RoomInput from './RoomInput';
import Header from './Header';

import { User } from './UsersHint';

import { RouteComponentProps, withRouter } from 'react-router';

import './EditEventPage.css';

interface MatchProps {
  id?: string;
  dateStart?: string;
  dateEnd?: string;
}

type CreateEventPageProps = RouteComponentProps<MatchProps>;

interface CreateEventPageState {
  dateStart: string;
  dateEnd: string;
  id: string;
  users: User[];
  usersInput: string;
}

class CreateEventPage extends React.Component<CreateEventPageProps, CreateEventPageState> {
  constructor(props: CreateEventPageProps) {
    super(props);
    this.state = {
      users: [],
      usersInput: '',
      dateStart: '',
      dateEnd: '',
      id: '',
    };
    this._onUserAdd = this._onUserAdd.bind(this);
    this._onUserRemove = this._onUserRemove.bind(this);
    this._onUsersInputChange = this._onUsersInputChange.bind(this);
  }
  componentWillMount() {
    let newState = Object.assign({}, this.state, {
      ...this.props.match.params
    });
    this.setState(newState);
  }
  render() {
    return (
      <div className="EditEventPage">
      <Header/>
      <div className="EditEventPage-Main">
        <div className="EditEventPage-Form">
          <h1 className="EditEventPage-Heading">
            Новая встреча
          </h1>
          <RoundButton classes={['EditEventPage-CloseButton']} icon={<Close/>}/>
          <div className="EditEventPage-Inputs">
            <div className="EditEventPage-InputsColumn">
              <TextInput
                classes={['EditEventPage-Input']}
                label="Тема"
                placeholder="О чем будете говорить?"
                value={'test'}
              />
              <UsersInputWithGQL
                users={this.state.users}
                inputValue={this.state.usersInput}
                onUserAdd={this._onUserAdd}
                onUserRemove={this._onUserRemove}
                onInputChange={this._onUsersInputChange}
              />
            </div>
            <div className="EditEventPage-InputsColumn">
              <DateInvervalInput
                classes={['EditEventPage-Input']}
                dateStart={this.state.dateStart}
                dateEnd={this.state.dateEnd}
              />
              <div className="EditEventPage-Input">
                <InputLabel>
                  Ваша переговорка:
                </InputLabel>
                <RoomInput
                  dateStart={this.state.dateStart}
                  dateEnd={this.state.dateEnd}
                  isActive={true}
                  room={{
                    title: 'Оранжевый рассвет',
                    floor: 4,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="EditEventPage-Footer">
        <Button classes={['EditEventPage-Button', 'Button_theme_cancel']}>Отмена</Button>
        <Button classes={['EditEventPage-Button', 'Button_theme_create']}>Создать Встречу</Button>
      </div>
    </div>
    );
  }
  private _onUsersInputChange(usersInput: string) {
    this.setState(Object.assign({}, this.state, { usersInput }));
  }
  private _onUserAdd(user: User) {
    const users = [
      ...this.state.users,
      user
    ];
    this.setState(Object.assign({}, this.state, { users }));
  }
  private _onUserRemove(user: User) {
    const users = this.state.users.filter(chosenUser => chosenUser.id !== user.id);
    this.setState(Object.assign({}, this.state, { users }));
  }
}

export default withRouter(CreateEventPage);

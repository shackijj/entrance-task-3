import * as React from 'react';
import Button from './Button';
import RoundButton from './RoundButton';
import { Close } from './GlyphIcon/GlyphIcon';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import DateInvervalInput from './DateIntervalInput';
import UsersInput from './UsersInput';
import RoomInput from './RoomInput';
import Header from './Header';

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
}

class CreateEventPage extends React.Component<CreateEventPageProps, CreateEventPageState> {
  constructor(props: CreateEventPageProps) {
    super(props);
    this.state = {
      dateStart: '',
      dateEnd: '',
      id: '',
    };
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
              <UsersInput users={[]} usersHint={[]}/>
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
}

export default withRouter(CreateEventPage);

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

import './EditEventPage.css';

class CreateEventPage extends React.Component {
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
                dateStart={'2018-01-13T15:24:49.265Z'}
                dateEnd={'2018-01-13T15:28:49.265Z'}
              />
              <div className="EditEventPage-Input">
                <InputLabel>
                  Ваша переговорка:
                </InputLabel>
                <RoomInput
                  dateStart={new Date('2018-01-13T15:24:49.265')}
                  dateEnd={new Date('2018-01-13T15:34:49.265')}
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

export default CreateEventPage;

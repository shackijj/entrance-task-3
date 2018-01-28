import * as React from 'react';
import Button from './Button';
import RoundButton from './RoundButton';
import { Close } from './GlyphIcon/GlyphIcon';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import UserInput from './UserInput';
import RoomInput from './RoomInput';
import Header from './Header';

import './EditEventPage.css';

const ButtonClasses = ['EditEventPage-Button', 'Button_theme_cancel'];

const EditEventPage = () => (
  <div className="EditEventPage">
    <Header/>
    <div className="EditEventPage-Main">
      <div className="EditEventPage-Form">
        <h1 className="EditEventPage-Heading">
          Редактрование встречи
        </h1>
        <RoundButton classes={['EditEventPage-CloseButton']} icon={<Close/>}/>
        <div className="EditEventPage-Inputs">
          <div className="EditEventPage-InputsColumn">
            <TextInput
              classes={['EditEventPage-Input']}
              label="Тема"
              placeholder="О чем будете говорить?"
            />
            <div>
              <TextInput label="Участники" classes={['EditEventPage-Input']}/>
              <UserInput
                login="Артур Пирожков"
                avatarUrl="https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg"
              />
              <UserInput
                login="Артур Пирожков"
                avatarUrl="https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg"
              />
            </div>
          </div>
          <div className="EditEventPage-InputsColumn">

            <div className="EditEventPage-Input">
                <InputLabel>
                  Рекомендованные переговорки
                </InputLabel>
                <RoomInput
                  dateStart={new Date('2018-01-13T15:24:49.265')}
                  dateEnd={new Date('2018-01-13T15:34:49.265')}
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
      <Button classes={ButtonClasses}>Отмена</Button>
      <Button classes={ButtonClasses}>Удалить Встречу</Button>
      <Button classes={ButtonClasses}>Сохранить</Button>
    </div>
  </div>
);

export default EditEventPage;

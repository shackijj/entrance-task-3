import * as React from 'react';
import Header from './Header';
import Button from './Button';
import RoundButton from './RoundButton';
import { Close } from './GlyphIcon/GlyphIcon';
import TextInput from './TextInput';

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
            <TextInput
              classes={['EditEventPage-Input']}
              label="Участники"
              placeholder="Например, Тор Одинович"
            />
          </div>
          <div className="EditEventPage-InputsColumn">
            <TextInput label="Участники"/>
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

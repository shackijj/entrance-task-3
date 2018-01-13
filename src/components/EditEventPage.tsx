import * as React from 'react';
import Header from './Header';
import Button from './Button';

import './EditEventPage.css';

const ButtonClasses = ['EditEventPage-Button', 'Button_theme_cancel'];

const EditEventPage = () => (
  <div className="EditEventPage">
    <Header/>
    <div className="EditEventPage-Main"/>
    <div className="EditEventPage-Footer">
      <Button classes={ButtonClasses}>Отмена</Button>
      <Button classes={ButtonClasses}>Удалить Встречу</Button>
      <Button classes={ButtonClasses}>Сохранить</Button>
    </div>
  </div>
);

export default EditEventPage;

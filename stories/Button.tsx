import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import Button from '../src/components/Button';

storiesOf('Button', module)
  .add('Button_theme_create', () => (
    <Button classes={['Button_theme_create']}>
      Создать встречу
    </Button>
  ))
  .add('Button_theme_create disabled', () => (
    <Button disabled={true} classes={['Button_theme_create']}>
      Создать встречу
    </Button>
  ))
  .add('Button_theme_cancel', () => (
    <Button classes={['Button_theme_cancel']}>
      Отмена
    </Button>
  ))
  .add('Button_theme_cancel disabled', () => (
    <Button disabled={true} classes={['Button_theme_cancel']}>
      Отмена
    </Button>
  ));
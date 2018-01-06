
import * as React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import '../src/index.css';
import Button from '../src/components/Button';

storiesOf('Button', module)
  .add('theme create', () => (
    <Button classes={['Button_theme_create']}>
      Создать встречу
    </Button>
  ))
  .add('theme create disabled', () => (
    <Button classes={['Button_theme_create']}>
      Создать встречу
    </Button>
  ));
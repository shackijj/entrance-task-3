import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from '../src/components/TextInput';
import { Close } from '../src/components/GlyphIcon/GlyphIcon';

storiesOf('TextInput', module)
  .add('default', () => (
      <TextInput value="" label="test"/>
  ))
  .add('with placeholder', () => (
    <TextInput value="" placeholder="О чем будете говорить?" label="Что-то"/>
  ))
  .add('with icon', () => (
    <TextInput value="" label="test" icon={<Close/>} />
  ));
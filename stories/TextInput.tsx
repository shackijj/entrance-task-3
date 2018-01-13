import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TextInput from '../src/components/TextInput';
import { Close } from '../src/components/GlyphIcon/GlyphIcon';

storiesOf('TextInput', module)
  .add('default', () => (
      <TextInput label="test"/>
  ))
  .add('with placeholder', () => (
    <TextInput placeholder="О чем будете говорить?" label="Что-то"/>
  ))
  .add('with icon', () => (
    <TextInput label="test" icon={<Close/>} />
  ));
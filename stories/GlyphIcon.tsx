import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ArrowLeft, ArrowRight, Calendar, Close, Edit } from '../src/components/GlyphIcon/GlyphIcon';

storiesOf('GlyphIcon', module)
  .add('ArrowLeft', () => (
    <ArrowLeft/>
  ))
  .add('ArrowRight', () => (
    <ArrowRight/>
  ))
  .add('Calendar', () => (
    <Calendar/>
  ))
  .add('Close', () => (
    <Close/>
  ))
  .add('Edit', () => (
    <Edit/>
  ));
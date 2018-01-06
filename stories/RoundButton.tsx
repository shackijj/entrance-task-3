import * as React from 'react';
import { storiesOf } from '@storybook/react';
import RoundButton from '../src/components/RoundButton';
import { Edit, ArrowLeft, ArrowRight } from '../src/components/GlyphIcon/GlyphIcon';

storiesOf('RoundButton', module)
  .add('with GlyphIcons', () => (
    <div>
      <RoundButton icon={<Edit/>}/>
      <RoundButton icon={<ArrowLeft/>}/>
      <RoundButton icon={<ArrowRight/>}/>
    </div>));
import * as React from 'react';
import { ArrowLeft, ArrowRight } from './GlyphIcon/GlyphIcon';
import RoundButton from './RoundButton';
import './DatePicker.css';

interface DatePickerProps {
  formattedDate: string;
}

const DatePicker = ({formattedDate}: DatePickerProps) => (
  <div className="DatePicker">
    <RoundButton classes={['DatePicker-ArrowLeft']} icon={<ArrowLeft/>}/>
    <span className="DatePicker-Date">
      {formattedDate}
    </span>
    <RoundButton classes={['DatePicker-ArrowRight']} icon={<ArrowRight/>}/>
  </div>
);

export default DatePicker;

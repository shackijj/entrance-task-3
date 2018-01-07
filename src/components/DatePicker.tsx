import * as React from 'react';
import * as classNames from 'classnames';
import { ArrowLeft, ArrowRight } from './GlyphIcon/GlyphIcon';
import RoundButton from './RoundButton';
import './DatePicker.css';

interface DatePickerProps {
  classes?: string[];
  formattedDate: string;
}

const DatePicker = ({formattedDate, classes}: DatePickerProps) => (
  <div className={classNames('DatePicker', classes)}>
    <RoundButton classes={['DatePicker-ArrowLeft']} icon={<ArrowLeft/>}/>
    <span className="DatePicker-Date">
      {formattedDate}
    </span>
    <RoundButton classes={['DatePicker-ArrowRight']} icon={<ArrowRight/>}/>
  </div>
);

export default DatePicker;

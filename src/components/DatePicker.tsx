import * as React from 'react';
import GlyphIcon from './GlyphIcon';
import './DatePicker.css';

interface DatePickerProps {
  formattedDate: string;
}

const DatePicker = ({formattedDate}: DatePickerProps) => (
  <div className="DatePicker">
    <GlyphIcon classes={['GlyphIcon_ArrowLeft', 'DatePicker-Icon']}/>
    <span className="DatePicker-Date">
      {formattedDate}
    </span>
    <GlyphIcon classes={['GlyphIcon_ArrowRight', 'DatePicker-Icon']}/>
  </div>
);

export default DatePicker;

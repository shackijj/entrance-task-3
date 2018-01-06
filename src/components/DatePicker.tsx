import * as React from 'react';
import './DatePicker.css';

interface DatePickerProps {
  formattedDate: string;
}

const DatePicker = ({formattedDate}: DatePickerProps) => (
  <div className="DatePicker">
    <span className="DatePicker-Date">
      {formattedDate}
    </span>
  </div>
);

export default DatePicker;

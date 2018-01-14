import * as React from 'react';
import * as classNames from 'classnames';
import { ArrowLeft, ArrowRight } from './GlyphIcon/GlyphIcon';
import RoundButton from './RoundButton';
import './DatePicker.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

/// <reference path="../contrib/react-dates.d" />
import { DayPicker } from 'react-dates';

interface DatePickerProps {
  classes?: string[];
  formattedDate: string;
  showCalendar?: boolean;
}

const DatePicker = ({formattedDate, classes, showCalendar}: DatePickerProps) => (
  <div className={classNames('DatePicker', {'DatePicker_open': showCalendar}, classes)}>
    <RoundButton classes={['DatePicker-ArrowLeft']} icon={<ArrowLeft/>}/>
    <span className="DatePicker-Date">
      {formattedDate}
    </span>
    <RoundButton classes={['DatePicker-ArrowRight']} icon={<ArrowRight/>}/>
    <div className="DatePicker-DayPicker" hidden={!showCalendar}>
      <DayPicker
        hideKeyboardShortcutsPanel={true}
        numberOfMonths={3}
        navPrev={<RoundButton icon={<ArrowLeft/>}/>}
        navNext={<RoundButton icon={<ArrowRight/>}/>}
      />
    </div>
  </div>
);

export default DatePicker;

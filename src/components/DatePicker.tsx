import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';

import { ArrowLeft, ArrowRight } from './GlyphIcon/GlyphIcon';
import RoundButton from './RoundButton';
import './DatePicker.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

/// <reference path="../contrib/react-dates.d" />
import { DayPicker } from 'react-dates';

interface DatePickerProps {
  classes?: string[];
  dateCurrent: Date;
  dateChosen?: Date;
  showCalendar?: boolean;
  onDatePick: (date: string) => void;
}

const DatePicker = ({classes, showCalendar, dateCurrent, onDatePick, dateChosen = dateCurrent}: DatePickerProps) => (
  <div className={classNames('DatePicker', {'DatePicker_open': showCalendar}, classes)}>
    <RoundButton
      classes={['DatePicker-ArrowLeft']}
      icon={<ArrowLeft/>}
      onClick={() => onDatePick(moment(dateChosen).add(-1, 'days').format('YYYY-MM-DD'))}
    />
    <span className="DatePicker-Date">
      {moment(dateChosen).format('D MMM')}
      {
        moment(dateChosen).isSame(dateCurrent, 'day') &&
        moment(dateChosen).isSame(dateCurrent, 'month') &&
        moment(dateChosen).isSame(dateCurrent, 'year') &&
        ' · Сегодня'
      }
    </span>
    <RoundButton
      classes={['DatePicker-ArrowRight']}
      icon={<ArrowRight/>}
      onClick={() => onDatePick(moment(dateChosen).add(1, 'days').format('YYYY-MM-DD'))}
    />
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

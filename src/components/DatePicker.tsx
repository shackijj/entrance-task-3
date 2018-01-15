import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';

import { ArrowLeft, ArrowRight } from './GlyphIcon/GlyphIcon';
import RoundButton from './RoundButton';
import './DatePicker.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

/// <reference path="../contrib/react-dates.d" />
import { DayPickerSingleDateController } from 'react-dates';

export interface DatePickerProps {
  dateCurrent: Date;
  onDatePick: (date: string) => void;
  classes?: string[];
  dateChosen?: Date;
}

const FORMAT = 'YYYY-MM-DD';

const DatePicker = ({classes, dateCurrent, onDatePick, dateChosen = dateCurrent}: DatePickerProps) => {
  let _isCalendarOpen = false;
  let _container: HTMLElement | null = null;
  const onDateClick = () => {
    if (_container) {
      if (_isCalendarOpen) {
        _container.classList.remove('DatePicker_open');
      } else {
        _container.classList.add('DatePicker_open');
      }

      _isCalendarOpen = !_isCalendarOpen;
    }
  };

  return (
    <div className={classNames('DatePicker', classes)} ref={div => _container = div}>
    <RoundButton
      classes={['DatePicker-ArrowLeft']}
      icon={<ArrowLeft/>}
      onClick={() => onDatePick(moment(dateChosen).add(-1, 'days').format(FORMAT))}
    />
    <span className="DatePicker-Date" onClick={onDateClick}>
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
      onClick={() => onDatePick(moment(dateChosen).add(1, 'days').format(FORMAT))}
    />
    <div className="DatePicker-DayPicker">
      <DayPickerSingleDateController
        onDateChange={(date: string) => onDatePick(moment(date).format(FORMAT))}
        hideKeyboardShortcutsPanel={true}
        isOutsideRange={(date: moment.Moment) => date.isBefore(dateCurrent)}
        numberOfMonths={3}
      />
    </div>
  </div>);
};

export default DatePicker;

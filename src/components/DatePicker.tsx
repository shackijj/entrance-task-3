import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';

import { ArrowLeft, ArrowRight } from './GlyphIcon/GlyphIcon';
import RoundButton from './RoundButton';
import './DatePicker.css';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';

export interface DatePickerProps {
  dateCurrent: Date;
  onDatePick: (date: string) => void;
  classes?: string[];
  dateChosen?: Date;
}

const FORMAT = 'YYYY-MM-DD';

export const DatePicker = ({classes, dateCurrent, onDatePick, dateChosen = dateCurrent}: DatePickerProps) => {
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

  const _onDatePick = (date: string) => {
    if (_container) {
      _isCalendarOpen = false;
      _container.classList.remove('DatePicker_open');
    }
    onDatePick(date);
  };

  return (
    <div className={classNames('DatePicker', classes)} ref={div => _container = div}>
      <RoundButton
        classes={['DatePicker-ArrowLeft']}
        icon={<ArrowLeft/>}
        onClick={() => _onDatePick(moment(dateChosen).add(-1, 'days').format(FORMAT))}
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
        onClick={() => _onDatePick(moment(dateChosen).add(1, 'days').format(FORMAT))}
      />
      <div className="DatePicker-DayPickerContainer">
        <DayPickerSingleDateController
          onDateChange={(date: string) => _onDatePick(moment(date).format(FORMAT))}
          hideKeyboardShortcutsPanel={true}
          isOutsideRange={(date: moment.Moment) => date.isBefore(dateCurrent, 'day')}
          numberOfMonths={3}
          initialVisibleMonth={() => moment(dateCurrent)}
          focused={true}
          noBorder={true}
        />
      </div>
    </div>
  );
};

export default DatePicker;
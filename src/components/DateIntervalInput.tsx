import * as React from 'react';
import * as moment from 'moment';
import TextInput from './TextInput';
import * as classNames from 'classnames';
import isHoursAndMinutes from '../utils/isHoursAndMinutes';

import { Calendar } from './GlyphIcon/GlyphIcon';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';
import './DateIntervalInput.css';

interface DateIntervalInputProps {
  dateCurrent?: string;
  dateStart?: string;
  dateEnd?: string;
  classes?: string[];
  onChange?: (dateStart: string, dateEnd: string) => void;
}

interface DateIntervalInputState {
  inputStart: string;
  inputEnd: string;
  inputDate: string;
  inputDateFocused: boolean;
  inputTimeStartFocused: boolean;
  inputTimeEndFocused: boolean;
}

class DateIntervalInput extends React.Component<DateIntervalInputProps, DateIntervalInputState> {
  private _dateContainer: HTMLDivElement;
  constructor(props: DateIntervalInputProps) {
    super(props);
    this.state = {
      inputDate: '',
      inputStart: '',
      inputEnd: '',
      inputDateFocused: false,
      inputTimeStartFocused: false,
      inputTimeEndFocused: false,
    };
    this._setInputsValues = this._setInputsValues.bind(this);
    this._onDateFocus = this._onDateFocus.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onTimeStartChange = this._onTimeStartChange.bind(this);
    this._onTimeEndChange = this._onTimeEndChange.bind(this);
    this._setDateContainerRef = this._setDateContainerRef.bind(this);           
    this._handleClickOutside = this._handleClickOutside.bind(this);
    this._onTimeStartInputFocus = this._onTimeStartInputFocus.bind(this);
    this._onTimeStartInputBlur  = this._onTimeStartInputBlur .bind(this);
    this._onTimeEndInputFocus = this._onTimeEndInputFocus.bind(this);
    this._onTimeEndInputBlur = this._onTimeEndInputBlur.bind(this);
  }
  componentDidMount() {
    document.addEventListener('mousedown', this._handleClickOutside);
    this._setInputsValues();
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this._handleClickOutside);
  }
  render() {
    const {dateCurrent, classes} = this.props;
    const {inputStart, inputEnd, inputDate, inputDateFocused, inputTimeEndFocused, inputTimeStartFocused} = this.state;
    return (
      <div className={classNames(['DateIntervalInput', classes])}>
        <div className="DateIntervalInput-Date" ref={this._setDateContainerRef}>
          <TextInput
            classes={['DateIntervalInput-DateInput']}
            label={'Дата'}
            value={inputDate}
            onFocus={this._onDateFocus}
            focused={inputDateFocused}
            icon={<Calendar/>}
          />
          <div
            className={
              classNames([
                'DateIntervalInput-Calendar',
                {'DateIntervalInput-Calendar_open': inputDateFocused}
              ])
              }
          >
            <DayPickerSingleDateController
              initialVisibleMonth={() => moment(dateCurrent)}
              focused={true}
              hideKeyboardShortcutsPanel={true}
              numberOfMonths={1}
              noBorder={true}
              isOutsideRange={(date: moment.Moment) => date.isBefore(dateCurrent, 'day')}
              onDateChange={this._onDateChange}
            />
          </div>
        </div>
        <TextInput 
          onChange={this._onTimeStartChange}
          classes={['DateIntervalInput-TimeStartInput']}
          label={'Начало'}
          value={inputStart}
          focused={inputTimeStartFocused}
          onFocus={this._onTimeStartInputFocus}
          onBlur={this._onTimeStartInputBlur}
        />
        <div className="DateIntervalInput-Separator">—</div>
        <TextInput
          onChange={this._onTimeEndChange}
          classes={['DateIntervalInput-TimeEndInput']}
          label={'Конец'}
          value={inputEnd}
          focused={inputTimeEndFocused}
          onFocus={this._onTimeEndInputFocus}
          onBlur={this._onTimeEndInputBlur}
        />
      </div>
    );
  }
  private _setInputsValues() {
    const {dateStart, dateEnd} = this.props;
    const start = moment(dateStart);
    const end = moment(dateEnd);
    const inputDate = start.format('D MMMM, YYYY');
    const inputStart = start.format('HH:mm');
    const inputEnd = end.format('HH:mm');
    const newState = {
      inputDate,
      inputStart,
      inputEnd
    };
    this.setState(Object.assign({}, this.state, newState));
  }
  private _onDateFocus() {
    this.setState(Object.assign({}, this.state, {inputDateFocused: true}));
  }

  private _onDateChange(date: string) {
    const {dateStart, dateEnd, onChange} = this.props;
    this.setState(Object.assign({}, this.state, {inputDateFocused: false}));
    if (onChange) {
      const newDate = moment(date).date();
      const start = moment(dateStart).date(newDate);
      const end = moment(dateEnd).date(newDate);
      onChange(start.toISOString(), end.toISOString());
    }
  }
  private _onTimeStartChange(value: string) {
    this.setState(Object.assign({}, this.state, { inputStart: value }));

    const {dateStart, dateEnd, onChange} = this.props;

    if (onChange && isHoursAndMinutes(value)) {
      const duration = moment.duration(value);
      const start = moment(dateStart).startOf('day').add(duration);
      const end = moment(dateEnd);
      onChange(start.toISOString(), end.toISOString());
    }
  }
  private _onTimeEndChange(value: string) {
    this.setState(Object.assign({}, this.state, { inputEnd: value }));

    const {dateStart, dateEnd, onChange} = this.props;

    if (onChange && isHoursAndMinutes(value)) {
      const duration = moment.duration(value);
      const start = moment(dateStart);
      const end = moment(dateEnd).startOf('day').add(duration);
      onChange(start.toISOString(), end.toISOString());
    }
  }
  private _setDateContainerRef(div: HTMLDivElement) {
    if (div) {
      this._dateContainer = div;
    }
  }
  private _handleClickOutside(event: MouseEvent) {
    const target = event.target as Node;
    if (this._dateContainer && !this._dateContainer.contains(target)) {
      this.setState(Object.assign({}, this.state, {inputDateFocused: false}));
    }
  }

  private _onTimeStartInputFocus() {
    this.setState(Object.assign({}, this.state, {inputTimeStartFocused: true}));
  }
  private _onTimeStartInputBlur() {
    this.setState(Object.assign({}, this.state, {inputTimeStartFocused: false}));
  }
  private _onTimeEndInputFocus() {
    this.setState(Object.assign({}, this.state, {inputTimeEndFocused: true}));
  }
  private _onTimeEndInputBlur() {
    this.setState(Object.assign({}, this.state, {inputTimeEndFocused: false}));
  }
}

export default DateIntervalInput;
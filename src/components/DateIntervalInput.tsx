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
  onChange?: (dateStart: string, dateEnd: string) => void;
}

interface DateIntervalInputState {
  inputStart: string;
  inputEnd: string;
  inputDate: string;
  inputDateFocused: boolean;
}

class DateIntervalInput extends React.Component<DateIntervalInputProps, DateIntervalInputState> {
  constructor(props: DateIntervalInputProps) {
    super(props);
    this.state = {
      inputDate: '',
      inputStart: '',
      inputEnd: '',
      inputDateFocused: false
    };
    this._setInputsValues = this._setInputsValues.bind(this);
    this._onDateBlur = this._onDateBlur.bind(this);
    this._onDateFocus = this._onDateFocus.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onTimeStartChange = this._onTimeStartChange.bind(this);
    this._onTimeEndChange = this._onTimeEndChange.bind(this);
  }
  componentDidMount() {
    this._setInputsValues();
  }
  render() {
    const {dateCurrent} = this.props;
    const {inputStart, inputEnd, inputDate, inputDateFocused} = this.state;
    return (
      <div className="DateIntervalInput">
        <div className="DateIntervalInput-Date">
          <TextInput
            classes={['DateIntervalInput-Date']}
            label={'Дата'}
            value={inputDate}
            onFocus={this._onDateFocus}
            onBlur={this._onDateBlur}
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
              onFocusChange={() => console.log('AS')}
              numberOfMonths={1}
              noBorder={true}
              isOutsideRange={(date: moment.Moment) => date.isBefore(dateCurrent, 'day')}
              onDateChange={this._onDateChange}
            />
          </div>
        </div>
        <TextInput 
          onChange={this._onTimeStartChange}
          classes={['DateIntervalInput-TimeStart']}
          label={'Начало'}
          value={inputStart}
        />
        <TextInput
          onChange={this._onTimeEndChange}
          classes={['DateIntervalInput-TimeEnd']}
          label={'Конец'}
          value={inputEnd}
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
  private _onDateBlur() {
    this.setState(Object.assign({}, this.state, {inputDateFocused: false}));
  }

  private _onDateChange(date: string) {
    const {dateStart, dateEnd, onChange} = this.props;
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
      const start = moment.utc(dateStart).startOf('day').add(duration);
      const end = moment.utc(dateEnd);
      onChange(start.toISOString(), end.toISOString());
    }
  }
  private _onTimeEndChange(value: string) {
    this.setState(Object.assign({}, this.state, { inputEnd: value }));

    const {dateStart, dateEnd, onChange} = this.props;

    if (onChange && isHoursAndMinutes(value)) {
      const duration = moment.duration(value);
      const start = moment.utc(dateStart);
      const end = moment.utc(dateEnd).startOf('day').add(duration);
      onChange(start.toISOString(), end.toISOString());
    }
  }
}

export default DateIntervalInput;
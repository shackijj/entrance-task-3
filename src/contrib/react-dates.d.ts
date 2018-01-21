/**
 * React dates doesn't have full typings 
 * I would try to make PR to @typing/react-dates
 * */
import * as React from 'react';
import * as moment from 'moment';

declare module 'react-dates' {
  interface DayPickerSingleDateControllerProps {
    onDateChange?: (date: string) => void;
    hideKeyboardShortcutsPanel?: boolean;
    isOutsideRange?: (moment: moment.Moment) => boolean;
    numberOfMonths?: number;
    focused?: boolean;
    isFocused?: boolean;
    orientation?: string;
  }

  class DayPickerSingleDateController extends React.Component<DayPickerSingleDateControllerProps> {
  }
}


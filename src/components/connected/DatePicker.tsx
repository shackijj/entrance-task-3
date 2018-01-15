import { connect } from 'react-redux';
import { AppState } from '../../reducers/';
import DatePicker from '../DatePicker';
import { chooseDate } from '../../actions/';

interface DispatchFromProps {
  onDatePick: (date: string) => void;
}

const DatePickerConnected = connect<AppState, DispatchFromProps, {classes: string[]}>(
  ({dateCurrent, dateChosen}: AppState) => ({
    dateCurrent,
    dateChosen
  }),
  dispatch => ({
    onDatePick: (date: string) => {
      dispatch(chooseDate(new Date(date)));
    }
  })
)(DatePicker);

export default DatePickerConnected;
import { connect } from 'react-redux';
import { AppState } from '../../reducers/';
import Timeline, { TimelineProps } from '../Timeline';
import * as moment from 'moment';

const TimelineConnected = connect<TimelineProps, {}, {classes: string[]}>(
  ({dateCurrent, dateChosen}: AppState) => ({
    currentTime: moment(dateCurrent).isSame(dateChosen, 'day') ? dateCurrent : undefined,
  })
)(Timeline);

export default TimelineConnected;
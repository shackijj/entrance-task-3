import * as React from 'react';
import * as classNames from 'classnames';

import { connect } from 'react-redux';
import { AppState } from '../reducers/';
import * as moment from 'moment';

import './Timeline.css';

export interface TimelineProps {
  hourStart?: number;
  hourEnd?: number;
  currentTime?: Date;
  classes?: string[];
}

export const Timeline = ({hourStart = 7, hourEnd = 23, currentTime, classes}: TimelineProps) => {
  const hours = [];
  for (let i = hourStart; i < hourEnd; i++) {
    hours.push(i + 1);
  }

  let formattedTime;
  let style;
  let hourCurrent: number | undefined;
  if (currentTime) {
    hourCurrent = currentTime.getHours();
    const hourMinutes = currentTime.getMinutes();
    if (hourCurrent >= hourStart && hourCurrent <= hourEnd) {
      formattedTime = `${hourCurrent}:${(hourMinutes < 10) ? '0' : ''}${hourMinutes}`;
      const totalMinutes = ((hourEnd + 1 - hourStart) * 60);
      const currentMinutes = (hourCurrent - hourStart) * 60 + hourMinutes;
      const offset = (currentMinutes / totalMinutes) * 100;
      style = {
        left: `${offset.toFixed(6)}%`
      };
    }
  }

  return (
    <ul className={classNames('Timeline', classes)}>
      <li className="Timeline-Background"/>
      {formattedTime ?
        <li style={style} className="Timeline-CurrentTime">
          <span className="Timeline-Clock">{formattedTime}</span>
        </li> : ''}
      {hours.map((hour, idx) => (
          <li
            key={idx}
            className={classNames('Timeline-Hour', {
              'Timeline-Hour_passed': (hourCurrent && hour <= hourCurrent) ? true : false
            })}
          >
            {hour}
          </li>
      ))}
    </ul>
  );
};

export const mapStateToProps = ({dateCurrent, dateChosen}: AppState) => ({
  currentTime: moment(dateCurrent).isSame(dateChosen, 'day') ? dateCurrent : undefined,
});

export default connect<TimelineProps, {}, {classes: string[]}>(
  mapStateToProps
)(Timeline);
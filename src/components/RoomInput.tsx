import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';
import { Close } from './GlyphIcon/GlyphIcon';

import './RoomInput.css';

interface RoomInputProps {
  dateStart: Date;
  dateEnd: Date;
  isActive?: boolean;
  room: {
    title: string;
    floor: number;
  };
}

const RoomInput: React.SFC<RoomInputProps> = ({dateStart, dateEnd, room, isActive}) => {
  const dateFormat = 'HH:mm';
  const start = moment(dateStart).format(dateFormat);
  const end = moment(dateEnd).format(dateFormat);
  return (
    <div className={classNames('RoomInput', {'RoomInput_active': isActive})}>
      <span className="RoomInput-StartEndTime">
        {start} - {end}
      </span>
      <span className="RoomInput-TitleAndFloor">
        {room.title} · {room.floor} этаж
      </span>
      <Close classes={['RoomInput-CloseIcon']}/>
    </div>
  );
};

export default RoomInput;

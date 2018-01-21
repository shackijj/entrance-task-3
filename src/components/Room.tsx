import * as React from 'react';
import * as classNames from 'classnames';
import './Room.css';

export interface RoomProps {
  title: string;
  capacity: number;
  isHovered?: boolean;
  isPressed?: boolean;
  isDisabled?: boolean;
}

const Room = ({isHovered, isPressed, isDisabled, title, capacity}: RoomProps) => (
  <div
    className={classNames(['Room', {
      'Room_hover': isHovered,
      'Room_pressed': isPressed,
      'Room_disabled': isDisabled,
    }])}
  >
    <div className="Room-Title">
      {title}
    </div>
    <div className="Room-Description">
      до {capacity} человек
    </div>
  </div>
);

export default Room;
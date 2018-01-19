import * as React from 'react';
import User, { UserProps } from './User';
import RoundButton from './RoundButton';
import { Edit } from './GlyphIcon/GlyphIcon';
import * as moment from 'moment';
import './EventTooltip.css';

export interface Event {
  title: string;
  dateStart: string;
  dateEnd: string;
  users: UserProps[];
}

interface EventTooltipProps extends Event {
  room: { title: string };
}

const EventTooltip = ({title, room, dateStart, dateEnd, users}: EventTooltipProps) => {
  const momentStart = moment(dateStart);
  const momentEnd = moment(dateEnd);
  const date = momentStart.format('D MMMM');
  const start = momentStart.format('HH:mm');
  const end = momentEnd.format('HH:mm');
  
  let moreUsers;
  const moreUsersLen = users.length - 1;
  switch (moreUsersLen) {
    case 0:
      moreUsers = '';
      break;
    case 1:
      moreUsers = `и еще 1 участник`;
      break;
    case 2:
    case 3:
    case 4:
      moreUsers = `и еще ${moreUsersLen} участника`;
      break;
    default:
      moreUsers = `и еще ${moreUsersLen} участников`;
  } 

  return (
    <div className="EventTooltip">
      <RoundButton classes={['EventTooltip-Button']} icon={<Edit/>}/>
      <div className="EventTooltip-Title">{title}</div>
      <div className="EventTooltip-Info">
        {date}, {start}—{end} · {room.title}
      </div>
      <div className="EventTooltip-Users">
        <User {...users[0]}/>
        <span className="EventTooltip-MoreUsers">{moreUsers}</span>
      </div>
    </div>
  );
};

export default EventTooltip;
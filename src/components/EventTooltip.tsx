import * as React from 'react';
import User from './User';
import RoundButton from './RoundButton';
import { Edit, Close } from './GlyphIcon/GlyphIcon';
import * as moment from 'moment';
import './EventTooltip.css';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

type User = {
  login: string;
  avatarUrl: string;
};

type Room = {
  title: string;
};

type Event = {
  title: string;
  dateStart: string;
  dateEnd: string;
  room: Room;
  users: User[];
  onCloseClick?: () => void;
  onEditClick?: () => void;
};

export const EventTooltip: React.SFC<Event> = ({title, room, dateStart, dateEnd, users, onCloseClick, onEditClick}) => {
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
      <div className="EventTooltip-ButtonContainer">
        <RoundButton onClick={onEditClick}classes={['EventTooltip-EditButton']} icon={<Edit/>}/>
        <RoundButton onClick={onCloseClick} classes={['EventTooltip-CloseButton']} icon={<Close/>}/>
      </div>
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

const TOOLTIP_QUERY = gql`
  query EventQuery($id: ID!) {
    event(id: $id) {
      title
      dateStart
      dateEnd
      room {
        title
      }
      users {
        login
        avatarUrl
      }
    }
  }
`;

type Response = {
  event: Event;
};

type InputProps = {
  id: string;
  onCloseClick?: () => void;
  onEditClick?: () => void;
};

export const withGraphQL = graphql<Response, InputProps>(TOOLTIP_QUERY, {
  options: ({id}) => ({
    variables: { id }
  })
});

export default withGraphQL(({data, onCloseClick, onEditClick}) => {
  if (data && data.event) {
    return (
      <EventTooltip
        {...data.event}
        onCloseClick={onCloseClick}
        onEditClick={onEditClick}
      />
    );
  }
  return <div/>;
});
import * as React from 'react';
import Timeline from './Timeline';
import Room from './Room';
import RoomTimeline from './RoomTimeline';
import * as classNames from 'classnames';
import { Floor } from './MainPage';
import { HOUR_START, HOUR_END } from '../constants';

import './EventsDiagram.css';

interface EventsDiagramProps {
  floors: Floor[];
  classes: string[];
}

const EventsDiagram: React.SFC<EventsDiagramProps> = ({floors, classes}) => (
  <div className={classNames('EventsDiagram', classes)}>
    <div className="EventsDiagram-HorizontalScrollContainer">
      <Timeline 
        classes={['EventsDiagram-Timeline']}
        hourStart={HOUR_START}
        hourEnd={HOUR_END}
      />

      <div className="EventsDiagram-VerticalScrollContainer">
        {floors.map((floor, floorIdx) => (
          <div className="EventDiagram-Floor" key={floorIdx}>
            <div className="EventDiagram-FloorTitle">{floor.floor} этаж</div>
            {
              floor.rooms.map((room, roomIdx) => (
                <div className="EventDiagram-Room" key={roomIdx}>
                  <Room {...room}/>
                  <RoomTimeline
                    hourStart={HOUR_START}
                    hourEnd={HOUR_END}
                    {...room}
                  />
                </div>
              ))
            }
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EventsDiagram;
import * as React from 'react';
import Timeline from './Timeline';
import Room from './Room';
import RoomTimeline from './RoomTimeline';
import * as classNames from 'classnames';
import { Floor } from './MainPage';
import { HOUR_START, HOUR_END } from '../constants';

import EventTooltip from './EventTooltip';

import './EventsDiagram.css';

interface EventsDiagramProps {
  floors: Floor[];
  classes: string[];
  dateCurrent?: Date;
}

type Tooltip = {
  eventId: string;
  x: number;
  y: number;
};

interface EventsDiagramState {
  tooltip: Tooltip | null;
}

class EventsDiagram extends React.Component<EventsDiagramProps, EventsDiagramState> {
  public onEventClick: (event: React.MouseEvent<HTMLDivElement>) => void;

  constructor(props: EventsDiagramProps) {
    super(props);
    this.state = {
      tooltip: null
    };
    this.onEventClick = this._onEventClick.bind(this);
  }

  public render() {
    const {floors, classes, dateCurrent} = this.props;
    return (
      <div className={classNames('EventsDiagram', classes)}>
        <div className="EventsDiagram-HorizontalScrollContainer">
          <Timeline 
            classes={['EventsDiagram-Timeline']}
            hourStart={HOUR_START}
            hourEnd={HOUR_END}
            dateCurrent={dateCurrent}
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
                        dateCurrent={dateCurrent}
                        hourStart={HOUR_START}
                        hourEnd={HOUR_END}
                        onEventClick={this.onEventClick}
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
  }

  private _onEventClick() {
    this.setState({
      tooltip: {
        eventId: '1',
        x: 1,
        y: 1
      }
    });
  }
}

export default EventsDiagram;
import * as React from 'react';
import Timeline from './Timeline';
import Room from './Room';
import RoomTimeline from './RoomTimeline';
import EventTooltip from './EventTooltip';
import * as classNames from 'classnames';
import { Floor } from './MainPage';
import { HOUR_START, HOUR_END } from '../constants';

import './EventsDiagram.css';

interface EventsDiagramProps {
  floors: Floor[];
  classes: string[];
  dateCurrent?: Date;
}

type Tooltip = {
  id: string;
  style: React.CSSProperties;
};

interface EventsDiagramState {
  tooltip: Tooltip | null;
}

class EventsDiagram extends React.Component<EventsDiagramProps, EventsDiagramState> {
  public onEventClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  private _container: HTMLDivElement | null;
  constructor(props: EventsDiagramProps) {
    super(props);
    this.state = {
      tooltip: null
    };
    this.onEventClick = this._onEventClick.bind(this);
  }

  public render() {
    const {floors, classes, dateCurrent} = this.props;
    const { tooltip }  = this.state;
    return (
      <div className={classNames('EventsDiagram', classes)} ref={div => this._container = div}>
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
        {tooltip && <EventTooltip {...tooltip}/>}
      </div>
    );
  }

  private _onEventClick(event: React.MouseEvent<HTMLDivElement>) {
    if (this._container) {
      const cr = this._container.getBoundingClientRect();
      const er = event.currentTarget.getBoundingClientRect();
      const left = er.left - cr.left + er.width / 2 + this._container.scrollLeft - 362 / 2;
      const lk = cr.width - (left + 362) + this._container.scrollLeft;

      this.setState({
        tooltip: {
          id: '1',
          style: {
            top: er.top - cr.top + er.height + this._container.scrollTop,
            left: lk < 0 ? left + lk : left,
          }
        }
      });
    }
  }
}

export default EventsDiagram;
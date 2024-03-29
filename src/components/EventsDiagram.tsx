import * as React from 'react';
import Timeline from './Timeline';
import Room from './Room';
import RoomTimeline from './RoomTimeline';
import EventTooltip from './EventTooltip';
import * as classNames from 'classnames';
import * as moment from 'moment';
import { Floor } from './MainPage';
import { HOUR_START, HOUR_END, MIN_EVENT_DURATION } from '../constants';

import './EventsDiagram.css';

interface EventsDiagramProps {
  floors: Floor[];
  classes: string[];
  date: string;
  isDateCurrent: boolean;
  onFreeSlotClick?: (roomId: string, dateStart: string, dateEnd: string) => void;
  onEventEditClick?: (eventId: string) => void;
}

type Tooltip = {
  eventId: string;
  roomId: string;
  style: React.CSSProperties;
};

interface EventsDiagramState {
  tooltip: Tooltip | null;
}

class EventsDiagram extends React.Component<EventsDiagramProps, EventsDiagramState> {
  private _container: HTMLDivElement | null;
  private _tooltip: HTMLDivElement | null;
  constructor(props: EventsDiagramProps) {
    super(props);
    this.state = {
      tooltip: null
    };
    this._onEventClick = this._onEventClick.bind(this);
    this._onEventEditClick = this._onEventEditClick.bind(this);
    this._closeTooltip = this._closeTooltip.bind(this);
  }

  public componentWillReceiveProps(nextProps: EventsDiagramProps) {
    if (this.props.date !== nextProps.date) {
      this._closeTooltip();
    }
  }

  public render() {
    const {floors, classes, date, isDateCurrent, onFreeSlotClick} = this.props;
    const { tooltip }  = this.state;
    const isScrollDisabled = !!tooltip;
    const highlightedEventId = tooltip ? tooltip.eventId : undefined;
    const dateStart = moment(date).startOf('day').add(HOUR_START, 'hours');
    const dateEnd = moment(date).startOf('day').add(HOUR_END, 'hours').endOf('hour');
    return (
      <div
        className={classNames('EventsDiagram', {'EventsDiagram_noscroll': isScrollDisabled }, classes)}
        ref={div => this._container = div}
      >
        <div className="EventsDiagram-HorizontalScrollContainer">
          <Timeline 
            classes={['EventsDiagram-Timeline']}
            hourStart={HOUR_START}
            hourEnd={HOUR_END}
            dateCurrent={new Date(date)}
          />

          <div
            className={classNames('EventsDiagram-VerticalScrollContainer', {
              'EventsDiagram-VerticalScrollContainer_noscroll': isScrollDisabled
            })}
          >
            {floors.map((floor, floorIdx) => (
              <div className="EventDiagram-Floor" key={floorIdx}>
                <div className="EventDiagram-FloorTitle">{floor.floor} этаж</div>
                {
                  floor.rooms.map((room, roomIdx) => (
                    <div className="EventDiagram-Room" key={roomIdx}>
                      <Room {...room} isHovered={!!(tooltip && room.id === tooltip.roomId)}/>
                      <RoomTimeline
                        id={room.id}
                        isDateCurrent={isDateCurrent}
                        date={date}
                        dateStart={dateStart.toISOString()}
                        dateEnd={dateEnd.toISOString()}
                        highlightEventId={highlightedEventId}
                        onEventClick={this._onEventClick}
                        onFreeSlotClick={onFreeSlotClick}
                        activeFreeSlotDuration={MIN_EVENT_DURATION}
                        {...room}
                      />
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </div>
        <div
          className="EventsDiagram-TooltipContainer"
          ref={div => this._tooltip = div}
          style={tooltip && tooltip.style || {}}
        >
          {tooltip &&
            <EventTooltip
              id={tooltip.eventId}
              onCloseClick={this._closeTooltip}
              onEditClick={this._onEventEditClick}
            />}
        </div>
      </div>
    );
  }

  private _closeTooltip() {
    const newState = Object.assign({}, this.state, { tooltip: null });
    this.setState(newState);
  }

  private _onEventEditClick() {
    if (this.props.onEventEditClick && this.state.tooltip) {
      const { eventId } = this.state.tooltip;
      this.props.onEventEditClick(eventId);
    }
  }

  private _onEventClick(eventId: string, roomId: string, divEvent: HTMLDivElement) {
    /**
     * TODO. Add unit tests
     */
    if (this._container && this._tooltip) {
      const er = divEvent.getBoundingClientRect();

      const cr = this._container.getBoundingClientRect();
      const tr = this._tooltip.getBoundingClientRect();
      let left = er.left - cr.left + er.width / 2 + this._container.scrollLeft - tr.width / 2;
      let top = er.top - cr.top + er.height + this._container.scrollTop;

      const rightOffset = cr.width - (left + tr.width) + this._container.scrollLeft;
      const leftOffset = left - this._container.scrollLeft;

      if (rightOffset < 0) {
        left = left + rightOffset;
      }
      if (leftOffset < 0)  {
        left = left - leftOffset;
      }
      if (top + tr.height > cr.height) {
        top = top - tr.height - er.height;
      }
      this.setState({
        tooltip: {
          eventId,
          roomId,
          style: {
            top,
            left,
          }
        }
      });
    }
  }
}

export default EventsDiagram;
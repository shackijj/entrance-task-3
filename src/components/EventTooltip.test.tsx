import * as React from 'react';
import EventTooltip from './EventTooltip';
import User from './User';
import RoundButton from './RoundButton';
import { Edit } from './GlyphIcon/GlyphIcon';
import { shallow } from 'enzyme';

describe('EventTooltip', () => {
  it('should render an event', () => {
    const event = {
      title: 'Событие 3',
      dateStart: new Date('2018-01-09T18:30:00.55'),
      dateEnd: new Date('2018-01-09T20:45:00.55'),
      room: {
        title: 'Желтый дом'
      },
      users: [
        {
          name: 'Дарт Вейдер 1',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        },
        {
          name: 'Дарт Вейдер 2',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        },
        {
          name: 'Дарт Вейдер 3',
          avatarUrl: 'https://pp.userapi.com/c402317/v402317531/6107/Tg1PWZHDAO0.jpg'
        }
      ]
    };

    const actual = shallow(<EventTooltip {...event} />);
    const expected = (
      <div className="EventTooltip">
        <RoundButton classes={['EventTooltip-Button']} icon={<Edit/>}/>
        <div className="EventTooltip-Title">
          Событие 3
        </div>
        <div className="EventTooltip-Info">
          9 января, 18:30—20:45 · Желтый дом
        </div>
        <div className="EventTooltip-Users">
          <User {...event.users[0]}/>
          <span className="EventTooltip-MoreUsers">и еще 2 участника</span>
        </div>
      </div>
    );
    expect(actual.matchesElement(expected)).toBeTruthy();
  });
});
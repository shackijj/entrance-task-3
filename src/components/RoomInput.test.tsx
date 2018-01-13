import * as React from 'react';
import RoomInput from './RoomInput';
import { shallow } from 'enzyme';
import { Close } from './GlyphIcon/GlyphIcon';

describe('RoomInput', () => {
  it('change _active modidier depending on isActive prop', () => {
    expect(shallow(
      <RoomInput
        dateStart={new Date('2018-01-13T15:24:49.265')}
        dateEnd={new Date('2018-01-13T15:34:49.265')}
        room={{
          title: 'Оранжевый рассвет',
          floor: 4,
        }}
      />)
      .find('.RoomInput_active')).toHaveLength(0);
    expect(shallow(
      <RoomInput
        isActive={true}
        dateStart={new Date('2018-01-13T15:24:49.265')}
        dateEnd={new Date('2018-01-13T15:34:49.265')}
        room={{
          title: 'Оранжевый рассвет',
          floor: 4,
        }}
      />)
      .find('.RoomInput_active')).toHaveLength(1);
  });
  it('should render a room with chosen dates', () => {
    const expected = (
      <div className="RoomInput">
      <span className="RoomInput-StartEndTime">
        15:24 - 15:34
      </span>
      <span className="RoomInput-TitleAndFloor">
        Оранжевый рассвет · 4 этаж
      </span>
      <Close classes={['RoomInput-CloseIcon']}/>
    </div>
    );
    const actual = shallow(
      <RoomInput
        dateStart={new Date('2018-01-13T15:24:49.265')}
        dateEnd={new Date('2018-01-13T15:34:49.265')}
        room={{
          title: 'Оранжевый рассвет',
          floor: 4,
        }}
      />);
    expect(actual.matchesElement(expected)).toBeTruthy();
  });
});

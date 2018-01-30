import isHourAndMinutes from './isHoursAndMinutes';

describe('isHourAndMinutes', () => {
  it('should return true for HH:mm values', () => {
    expect(isHourAndMinutes('12:41')).toEqual(true);
    expect(isHourAndMinutes('09:59')).toEqual(true);
    expect(isHourAndMinutes('8:41')).toEqual(true);
  });

  it('should return false for others', () => {
    expect(isHourAndMinutes('00001:41')).toEqual(false);
    expect(isHourAndMinutes('09:71')).toEqual(false);
    expect(isHourAndMinutes('asdsd')).toEqual(false);
  });
});

import * as React from 'react';
import { mount } from 'enzyme';
import CreateEventPage from './CreateEventPage';
import { MemoryRouter, Route, RouteProps } from 'react-router';
import DateIntervalInput from './DateIntervalInput';
import { MockedProvider } from 'react-apollo/test-utils';

describe('CreateEventPage', () => {
  it('should take params from history and put then into DateInput and RoomInput compomnents', () => {
    const dateStart = '2018-01-09T07:00:00.000Z';
    const dateEnd = '2018-01-09T07:15:00.000Z';
    const wrapper = mount(
      <MockedProvider>
        <MemoryRouter initialEntries={[`/create/1/${dateStart}/${dateEnd}`]}>
          <Route
            component={(props: RouteProps) => <CreateEventPage {...props}/>}
            path="/create/:roomId?/:dateStart?/:dateEnd?"
          />
        </MemoryRouter>
      </MockedProvider>,
    );
    const dateIntervalProps = wrapper.find(DateIntervalInput).props();
    expect(dateIntervalProps.dateStart).toEqual(dateStart);
    expect(dateIntervalProps.dateEnd).toEqual(dateEnd);
  });

  it('when a user from the hint is clicked it should be added to state');

  it('when DateInput is changed request for recommended rooms should be made and chosen room should be hidden');

  it('while create query is working, the loader should be shown');

  it('should show a modal window if an event was succefully created');

  it('should show a modal window if create query was failed');

  it('once all fields are filled submit should become available and on click it should fire onSubmit');

  it('once CancelButton get clicked history should be pushed to previous step');

  it('once CloseButton get clicked click history should be pushed to previous step');
});

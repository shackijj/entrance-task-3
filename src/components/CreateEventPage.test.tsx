import * as React from 'react';
import { mount } from 'enzyme';
import CreateEventPage from './CreateEventPage';
import { MemoryRouter, Route, RouteProps } from 'react-router';
import DateIntervalInput from './DateIntervalInput';
import { MockedProvider } from 'react-apollo/test-utils';
import { addTypenameToDocument } from 'apollo-utilities';
import { USERS_QUERY } from './UsersInput';

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
    wrapper.unmount();
  });

  it('when a user from the hint is clicked it should be added to state', () => {
    const dateStart = '2018-01-09T07:00:00.000Z';
    const dateEnd = '2018-01-09T07:15:00.000Z';
    const mocks = [
      {
        request: {
          query: addTypenameToDocument(USERS_QUERY),
          variables: {}
        },
        result: {
          data: {
            users: [
              {
                id: '2',
                firstName: 'Test',
                secondName: 'Second',
                avatarUrl: 'http://s.x',
                floor: {
                  floor: 1,
                  __typename: 'Floor',
                },
                __typename: 'User',
              }
            ]
          }
        }
      },
    ];
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={[`/create/1/${dateStart}/${dateEnd}`]}>
          <Route
            component={CreateEventPage}
            path="/create/:roomId?/:dateStart?/:dateEnd?"
          />
        </MemoryRouter>
      </MockedProvider>,
    );

    expect(wrapper.find('.UserInput')).toHaveLength(0);

    const promise = new Promise((resolve) => {
      setTimeout(
        () => {
          wrapper.find('.UsersInput-Input input').simulate('focus');
          wrapper.find('.UsersHint-User').first().simulate('click');
          const user = wrapper.find('.UserInput');
          resolve(user);
        },
        0);
    });

    return expect(promise).resolves.toHaveLength(1);
  });

  it('when DateInput is changed request for recommended rooms should be made and chosen room should be hidden');

  it('while create query is working, the loader should be shown');

  it('should show a modal window if an event was succefully created');

  it('should show a modal window if create query was failed');

  it('once all fields are filled submit should become available and on click it should fire onSubmit');

  it('once CancelButton get clicked history should be pushed to previous step');

  it('once CloseButton get clicked click history should be pushed to previous step');
});

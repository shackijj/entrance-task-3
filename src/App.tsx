import * as React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from './components/MainPage';
import EditEventPage from './components/EditEventPage';
import CreateEventPage from './components/CreateEventPage';

const App = () => (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" render={() => <Redirect to="/events/today"/>} />
        <Route exact={true} path="/events/" render={() => <Redirect to="/events/today"/>} />
        <Route exact={true} path="/events/:date" component={MainPage} />
        <Route exact={true} path="/create" component={CreateEventPage} />
        <Route exact={true} path="/edit/:id" component={EditEventPage} />
      </Switch>
    </div>
);

export default App;
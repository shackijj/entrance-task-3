import * as React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';

const App = () => (
  <div className="App">
    <Header/>
    <Switch>
      <Route exact={true} path="/" render={() => <Redirect to="/events/today"/>} />
      <Route exact={true} path="/events/:date" component={MainPage} />
      <Route exact={true} path="/create" component={MainPage} />
      <Route exact={true} path="/edit/:id" component={MainPage} />
    </Switch>
  </div>
);

export default App;
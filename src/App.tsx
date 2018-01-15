import * as React from 'react';

// import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './components/MainPage';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <MainPage/>
      </div>
    );
  }
}

export default connect()(App);

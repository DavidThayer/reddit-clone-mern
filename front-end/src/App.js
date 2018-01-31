import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import SinglePostPage from './pages/SinglePostPage';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">reddit</h1>
          <h2 className="App-blurb">The front page of the web</h2>
        </header>

        <Switch>
          <Route exact path="/" component={ HomePage }/>
          <Route path="/posts/:post_id" component={ SinglePostPage } />
        </Switch>
      </div>
    );
  }
}

export default App;

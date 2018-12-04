import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/Landing';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Poll from './components/poll/Poll';
import CreatePoll from './components/CreatePoll';
import NotFound from './components/NotFound';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/poll/:poll_id" component={Poll} />
              <Route exact path="/create" component={CreatePoll} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

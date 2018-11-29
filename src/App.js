import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/Landing';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Poll from './components/poll/Poll';
import CreatePoll from './components/CreatePoll';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/poll/:poll_id" component={Poll} />
            <Route exact path="/create" component={CreatePoll} />
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

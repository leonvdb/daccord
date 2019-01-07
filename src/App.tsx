import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import store from './store';


import CreatePoll from './components/CreatePoll';
import Landing from './components/Landing';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import NotFound from './components/NotFound';
import Poll from './components/Poll';

import './App.css';
import { setAuthTokenAndUser } from './actions/userActions';
import i18n from './i18n';

if (localStorage.jwtToken) {
  store.dispatch(setAuthTokenAndUser(localStorage.jwtToken))
}

class App extends React.Component {
  public render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Header />
              <Switch>
                <Route exact={true} path="/" component={Landing} />
                <Route exact={true} path="/poll/:poll_id" component={Poll} />
                <Route exact={true} path="/create" component={CreatePoll} />
                <Route component={NotFound} />
              </Switch>
              <Footer />
            </div>
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    );
  }
}

export default App;

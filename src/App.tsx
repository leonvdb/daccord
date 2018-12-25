import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store';
import setAuthToken from './utilities/setAuthToken';
import * as jwtDecode from 'jwt-decode';
import { IUserJwt } from './interfaces';
import { setCurrentUser } from './actions/pollActions';

import CreatePoll from './components/CreatePoll';
import Landing from './components/Landing';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import NotFound from './components/NotFound';
import Poll from './components/Poll';

import './App.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded: IUserJwt = jwtDecode(localStorage.jwtToken);
  const user = {
    accountLogin: decoded.accountLogin,
    pollId: decoded.pollId,
    userId: decoded.userId,
    userType: decoded.userType
  }
  store.dispatch(setCurrentUser(user))
}

class App extends React.Component {
  public render() {
    return (
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
    );
  }
}

export default App;

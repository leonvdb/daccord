import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import store from './store';

import CreatePoll from './components/CreatePoll';
import Landing from './components/Landing';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import NotFound from './components/NotFound';
import Poll from './components/poll';

import defaults from './graphql/client/defaults';

import './App.css';
import i18n from './i18n';
import { setAuthTokenAndUser } from './actions/authActions';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  request: async operation => {
    operation.setContext({
      headers: {
        Authorization: localStorage.getItem('jwtToken')
      }
    })
  },
  clientState: {
    defaults,
    resolvers: {}
  }
})

if (localStorage.jwtToken) {
  store.dispatch(setAuthTokenAndUser(localStorage.jwtToken, localStorage.user))
}

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
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
      </ApolloProvider>
    );
  }
}

export default App;

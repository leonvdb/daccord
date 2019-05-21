import * as React from 'react';
import GlobalStyle from './style/Global';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nextProvider } from "react-i18next";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import store from './store';
import { BaseCSS } from 'styled-bootstrap-grid'

import CreatePoll from './components/CreatePoll';
import Landing from './components/Landing';
import NotFound from './components/NotFound';
import Poll from './components/poll';

import i18n from './i18n';
import setAuthToken from './utilities/setAuthToken';
import { decode } from 'jsonwebtoken';

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  request: async operation => {
    operation.setContext({
      headers: {
        Authorization: localStorage.getItem('jwtToken')
      }
    })
  }
})

if (localStorage.jwtToken) {
  const { exp }: any = decode(localStorage.jwtToken.replace('Bearer ', ''))
  if (Date.now() / 1000 > exp) {
    localStorage.removeItem('jwtToken');
  } else {
    setAuthToken(localStorage.jwtToken)
  }
}

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <BaseCSS />
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <BrowserRouter>
              <div className="App">
                <GlobalStyle />
                <Switch>
                  <Route exact={true} path="/" component={Landing} />
                  <Route exact={true} path="/poll/:poll_id" component={Poll} />
                  <Route name="pollNavRoute" path="/poll/:poll_id/:pollNavRoute" component={Poll} />
                  <Route exact={true} path="/create" component={CreatePoll} />
                  <Route component={NotFound} />
                </Switch>
              </div>
            </BrowserRouter>
          </Provider>
        </I18nextProvider>
      </ApolloProvider>
    );
  }
}

export default App;

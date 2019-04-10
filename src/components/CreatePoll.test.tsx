

import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent } from 'react-testing-library'
import CreatePoll from './CreatePoll';
import { Provider } from 'react-redux';
import store from '../store';
import { MockedProvider } from 'react-apollo/test-utils';

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withNamespaces: () => (Component: React.FunctionComponent) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key: any) => key };
        return Component;
    },
}));

afterEach(cleanup)

const history = createMemoryHistory({ initialEntries: ["/create"] })
history.goBack = jest.fn()

test('<Route exact={true} path="/create" component={CreatePoll} /> to goBack', () => {
    const { debug, getByTestId } = render(
        <Router history={history}>
            <MockedProvider>
                <Provider store={store}>
                    <Switch>
                        <Route exact={true} path="/create" component={CreatePoll} />
                    </Switch>
                </Provider>
            </MockedProvider>
        </Router>
    )
    debug();
    expect(getByTestId('create-poll-form'));
    fireEvent.click(getByTestId('close-button'));
    expect(history.goBack).toBeCalledTimes(1);

});



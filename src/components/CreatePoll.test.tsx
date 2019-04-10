

import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import CreatePoll from './CreatePoll';
import { Provider } from 'react-redux';
import store from '../store';
import { MockedProvider } from 'react-apollo/test-utils';
import { CREATE_POLL } from '../graphql/cudPoll';
import mockPoll from '../testingResources/mockPoll';

const createPollMock = [
    {
        request: {
            query: CREATE_POLL,
            variables: {
                title: mockPoll.title,
                description: '',
                userName: mockPoll.creator.name,
                userEmail: mockPoll.creator.email,
            }
        },
        result: {
            data: {
                createPoll: {
                    user: {
                        id: mockPoll.creator.id,
                        email: mockPoll.creator.email
                    },
                    poll: {
                        refId: mockPoll.refId
                    },
                    token: 'creatorToken',
                    pseudonym: mockPoll.creator.name
                }
            }
        },
    },
];

const TestedComponent = () => (<Router history={history}>
    <MockedProvider mocks={createPollMock} addTypename={false}>
        <Provider store={store}>
            <Switch>
                <Route exact={true} path="/create" component={CreatePoll} />
            </Switch>
        </Provider>
    </MockedProvider>
</Router>)

const history = createMemoryHistory({ initialEntries: ["/create"] })


jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    withNamespaces: () => (Component: React.FunctionComponent) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key: any) => key };
        return Component;
    },
}));

history.goBack = jest.fn()
history.push = jest.fn()

afterEach(cleanup)

test('<Route exact={true} path="/create" component={CreatePoll} /> to goBack', () => {
    const { getByTestId } = render(<TestedComponent />)
    expect(getByTestId('create-poll-form'));
    fireEvent.click(getByTestId('close-button'));
    expect(history.goBack).toBeCalledTimes(1);

});

test('<Route exact={true} path="/create" component={CreatePoll} /> validate title', async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId, getAllByTestId } = render(<TestedComponent />)
    const nextButton = (getByTestId('next-button'));
    fireEvent.click(nextButton);
    expect(getByTestId('error-message'));
    const titleInput = (getByPlaceholderText("Enter Title") as HTMLInputElement)
    fireEvent.change(titleInput, {
        target: {
            value: mockPoll.title
        }
    })
    fireEvent.click(nextButton);
    expect(queryByTestId('error-message')).toBeFalsy()
    fireEvent.click(getByTestId('finish-button'))
    expect(getAllByTestId('error-message').length).toBe(2)
    const nameInput = (getByPlaceholderText("Enter Name") as HTMLInputElement)
    const emailInput = (getByPlaceholderText("Enter Email") as HTMLInputElement)
    fireEvent.change(nameInput, {
        target: {
            value: mockPoll.creator.name
        }
    })
    fireEvent.change(emailInput, {
        target: {
            value: mockPoll.creator.email
        }
    })
    fireEvent.click(getByTestId('finish-button'));
    expect(getByTestId('loading-state'));
    await wait(() => {
        expect(history.push).toBeCalledTimes(1);
    });
})
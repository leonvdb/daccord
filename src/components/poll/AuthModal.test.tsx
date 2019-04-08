import React from 'react';
import AuthModal from './AuthModal'
import { render, fireEvent, cleanup, waitForElement } from 'react-testing-library';
import { ApolloProvider } from 'react-apollo';
import { client } from '../../App';
import { Provider } from 'react-redux';
import store from '../../store';
import mockPoll from '../../testingResources/mockPoll'
import { CREATE_PARTICIPANT } from '../../graphql/createParticipant';
import { MockedProvider } from 'react-apollo/test-utils';

const originalError = console.error
beforeAll(() => {
    console.error = (...args: any) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
})

afterEach(cleanup);

const createMock = (email: string, name: string, returnToken: boolean) => ([
    {
        request: {
            query: CREATE_PARTICIPANT,
            variables: {
                pollId: mockPoll.refId,
                email,
                pseudonym: name
            }
        },
        result: {
            data: {
                createParticipant: {
                    user: {
                        id: 'mockId',
                        email
                    },
                    token: returnToken ? 'newParticipantToken' : '',
                    pseudonym: name
                }
            }
        },
    },
])

test('<AuthModal /> to show Modal on Click', () => {
    const { getByTestId, queryByTestId } = render(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AuthModal poll={mockPoll} renderButton={true} />
            </ApolloProvider>
        </Provider>
    );
    expect(queryByTestId('auth-modal')).toBeFalsy();
    const participateButton = getByTestId('participate-button');
    fireEvent.click(participateButton);
    expect(getByTestId('auth-modal'));
    expect(getByTestId('auth-modal')).toMatchSnapshot();
})

test('<AuthModal /> rejects invalid input', () => {
    const { getByTestId, getByPlaceholderText } = render(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AuthModal poll={mockPoll} isOpen={true} />
            </ApolloProvider>
        </Provider>
    );

    expect(getByTestId('auth-modal'));
    const emailInput = (getByPlaceholderText("Enter Email") as HTMLInputElement)
    fireEvent.change(emailInput, {
        target: {
            value: 'invalid Email'
        }
    })
    expect(emailInput.value).toBe('invalid Email')
    fireEvent.click(getByTestId('submit-button'))
    expect(getByTestId('error-message'))
})

test('<AuthModa /> raises error for already existing participants', async () => {
    const { getByPlaceholderText, getByTestId } = render(
        <Provider store={store}>
            <MockedProvider mocks={createMock(mockPoll.creator.email, mockPoll.creator.name, false)} addTypename={false}>
                <AuthModal poll={mockPoll} isOpen={true} />
            </MockedProvider>
        </Provider>
    );

    const emailInput = (getByPlaceholderText("Enter Email") as HTMLInputElement)
    const nameInput = (getByPlaceholderText("Enter Name") as HTMLInputElement)
    fireEvent.change(emailInput, {
        target: {
            value: mockPoll.creator.email
        }
    })
    fireEvent.change(nameInput, {
        target: {
            value: mockPoll.creator.name
        }
    })
    fireEvent.click(getByTestId('submit-button'));
    expect(getByTestId('loading-state'));
    await waitForElement(() => getByTestId('participant-error'));
    fireEvent.click(getByTestId('back-button'));
})
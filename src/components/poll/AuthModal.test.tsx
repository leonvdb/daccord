import React from 'react';
import AuthModal from './AuthModal'
import { render, fireEvent } from 'react-testing-library';
import { ApolloProvider } from 'react-apollo';
import { client } from '../../App';
import { Provider } from 'react-redux';
import store from '../../store';
import mockPoll from '../../testingResources/mockPoll'



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

test('<AuthModal /> to accept and verify input', () => {
    const { getByTestId, getByPlaceholderText } = render(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AuthModal poll={mockPoll} modalOpen={true} />
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
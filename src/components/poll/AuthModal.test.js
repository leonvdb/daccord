import React from 'react';
import AuthModal from './AuthModal'
import { render, fireEvent } from 'react-testing-library';
import { ApolloProvider } from 'react-apollo';
import { client } from '../../App';
import { Provider } from 'react-redux';
import store from '../../store';

const poll = {
    title: "Test Poll",
    description: "Description of the Test Poll",
    refId: "TestRefId",
    creator: {
        id: "TestCreatorId",
        email: "creator@example.com",
        name: "Test Creator"
    },
    options: [{
        title: "Test Option",
        description: "Test Option Description",
        creator: {
            id: "TestCreatorId",
            email: "creator@example.com",
            name: "Test Creator"
        },
        refId: "TestOptionRefId",
        userRating: "8",
        result: {
            totalOpposition: 8,
            agreementInPercent: 20
        }
    }],
    participants: [{
        user: {
            id: "TestParticipantId",
            email: "participant@example.com",
            name: "Test Participant"
        }
    }]
}


test('<AuthModal /> to show Modal on Click', () => {
    const { debug, getByTestId, queryByTestId } = render(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AuthModal poll={poll} renderButton={true} />
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
    const { debug, getByTestId, getByPlaceholderText } = render(
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AuthModal poll={poll} modalOpen={true} />
            </ApolloProvider>
        </Provider>
    );

    expect(getByTestId('auth-modal'));
    const emailInput = getByPlaceholderText("Enter Email")
    fireEvent.change(emailInput, {
        target: {
            value: 'invalid Email'
        }
    })
    expect(emailInput.value).toBe('invalid Email')
    fireEvent.click(getByTestId('submit-button'))
    expect(getByTestId('error-message'))
})
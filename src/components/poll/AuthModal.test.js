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


test('<AuthModal /> Modal Closed, button Rendered', () => {
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
    debug();
})
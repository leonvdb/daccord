import React from 'react';
import { render } from 'react-testing-library';
import Settings from './index'
import mockPoll from '../../../testingResources/mockPoll';
import { mockParticipantUser, mockCreatorUser } from '../../../testingResources/mockUser';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from 'react-apollo/test-utils';

test('<Settings> as non-Creator', () => {
    const { queryByTestId } = render(
        <MockedProvider>
            <MemoryRouter>
                <Settings poll={mockPoll} user={mockParticipantUser} />
            </MemoryRouter>
        </MockedProvider>
    );
    expect(queryByTestId('delete-button')).toBeFalsy()
})
test('<Settings> as Creator', () => {
    const { getByTestId } = render(
        <MockedProvider>
            <MemoryRouter>
                <Settings poll={mockPoll} user={mockCreatorUser} />
            </MemoryRouter>
        </MockedProvider>
    );
    expect(getByTestId('delete-button'));
})
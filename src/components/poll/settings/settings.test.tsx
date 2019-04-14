import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Settings from './index'
import mockPoll from '../../../testingResources/mockPoll';
import { mockParticipantUser, mockCreatorUser } from '../../../testingResources/mockUser';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from 'react-apollo/test-utils';
import { UPDATE_POLL } from '../../../graphql/cudPoll';
interface Props {
    isCreator: boolean
}
const updatedTitle = 'updated Title'
const mockEditTitle = {
    request: {
        query: UPDATE_POLL,
        variables: {
            pollId: mockPoll.refId,
            title: updatedTitle,
            description: mockPoll.description
        }
    },
    result: {
        data: {
            updatePoll: {
                title: updatedTitle,
                description: mockPoll.description
            }
        }
    },
};
const mocks = [mockEditTitle]

const WrappedSettings = (props: Props) => (<MockedProvider mocks={mocks} addTypename={false}>
    <MemoryRouter>
        <Settings poll={mockPoll} user={props.isCreator ? mockCreatorUser : mockParticipantUser} />
    </MemoryRouter>
</MockedProvider>)

afterEach(cleanup);

test('<Settings> as non-Creator', () => {
    const { queryByTestId } = render(<WrappedSettings isCreator={false} />);
    expect(queryByTestId('delete-button')).toBeFalsy()
})
test('<Settings> as Creator open delete Modal', () => {
    const { getByTestId } = render(<WrappedSettings isCreator={true} />);
    expect(getByTestId('delete-button'));
    fireEvent.click(getByTestId('delete-button'));
    expect(getByTestId('delete-modal'));
})
test('<Settings> as Creator open delete Modal', async () => {
    const { getByTestId, queryByTestId } = render(<WrappedSettings isCreator={true} />);
    expect(queryByTestId('edit-title-form')).toBeFalsy();
    fireEvent.click(getByTestId('edit-title-button'));
    expect(getByTestId('edit-title-form'));
    const titleInput = (getByTestId('title-input') as HTMLInputElement)
    fireEvent.change(titleInput, {
        target: {
            value: updatedTitle
        }
    })
    fireEvent.click(getByTestId('title-save-button'))
})

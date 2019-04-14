import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import Settings from './index'
import mockPoll from '../../../testingResources/mockPoll';
import { mockParticipantUser, mockCreatorUser } from '../../../testingResources/mockUser';
import { MemoryRouter } from 'react-router';
import { MockedProvider } from 'react-apollo/test-utils';
import { UPDATE_POLL } from '../../../graphql/cudPoll';
import { Provider } from 'react-redux';
import store from '../../../store';
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

const WrappedSettings = (props: Props) => (
    <Provider store={store}>
        <MockedProvider mocks={mocks} addTypename={false}>
            <MemoryRouter>
                <Settings poll={mockPoll} user={props.isCreator ? mockCreatorUser : mockParticipantUser} pseudonym="Test Pseudonym" />
            </MemoryRouter>
        </MockedProvider>
    </Provider>
)

afterEach(cleanup);

test('<Settings> as non-Creator', () => {
    const { queryByTestId } = render(<WrappedSettings isCreator={false} />);
    expect(queryByTestId('delete-button')).toBeFalsy()
})

test('<Settings> as non-Creator', () => {
    const { queryByTestId, getByTestId } = render(<WrappedSettings isCreator={false} />);
    expect(queryByTestId('delete-button')).toBeFalsy();
    fireEvent.click(getByTestId('withdraw-button'));
    expect(getByTestId('withdraw-modal'));
})

test('<Settings> as Creator open delete Modal', () => {
    const { getByTestId } = render(<WrappedSettings isCreator={true} />);
    expect(getByTestId('delete-button'));
    fireEvent.click(getByTestId('delete-button'));
    expect(getByTestId('delete-modal'));
})
test('<Settings> as Creator edit title', () => {
    const { getByTestId, queryByTestId, getByText } = render(<WrappedSettings isCreator={true} />);
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
    expect(getByText(updatedTitle))
})
test('<Settings> as Creator cancel editing title', () => {
    const { getByTestId, queryByTestId, getByText } = render(<WrappedSettings isCreator={true} />);
    fireEvent.click(getByTestId('edit-title-button'));
    expect(getByTestId('edit-title-form'));
    const titleInput = (getByTestId('title-input') as HTMLInputElement)
    fireEvent.change(titleInput, {
        target: {
            value: updatedTitle
        }
    })
    fireEvent.click(getByTestId('title-cancel-button'));
    expect(queryByTestId('title-save-button')).toBeFalsy
    expect(getByText(mockPoll.title))
})
test('<Settings> as Creator form validation of title field', () => {
    const { getByTestId, queryByTestId } = render(<WrappedSettings isCreator={true} />);
    fireEvent.click(getByTestId('edit-title-button'));
    expect(getByTestId('edit-title-form'));
    const titleInput = (getByTestId('title-input') as HTMLInputElement);
    fireEvent.change(titleInput, {
        target: {
            value: ''
        }
    });
    fireEvent.click(getByTestId('title-save-button'));
    expect(getByTestId('error-message'));
    fireEvent.click(getByTestId('title-cancel-button'));
    fireEvent.click(getByTestId('edit-title-button'));
    expect(queryByTestId('error-message')).toBeFalsy();
})

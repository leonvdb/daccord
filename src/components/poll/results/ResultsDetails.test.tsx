import React from 'react';
import { render } from 'react-testing-library';
import ResultDetails from './ResultDetails'
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_VOTES_FROM_OPTION } from '../../../graphql/getOption';
import mockPoll from '../../../testingResources/mockPoll';
import mockOption from '../../../testingResources/mockOption';
import mockUser from '../../../testingResources/mockUser';

const mocks = [
    {
        request: {
            query: GET_VOTES_FROM_OPTION,
            variables: {
                pollId: mockPoll.refId,
                optionId: mockOption.refId
            }
        },
        result: {
            data: {
                dog: { id: '1', name: 'Buck', breed: 'bulldog' },
            },
        },
    },
];

test('<Poll />', () => {
    const { debug } = render(
        <MockedProvider mocks={mocks}>
            <ResultDetails poll={mockPoll} option={mockOption} user={mockUser} rank={1} />
        </MockedProvider>
    );
    debug();
})
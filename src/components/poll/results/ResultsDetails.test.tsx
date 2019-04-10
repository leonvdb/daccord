import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import ResultDetails from './ResultDetails'
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_VOTES_FROM_OPTION } from '../../../graphql/getOption';
import mockPoll from '../../../testingResources/mockPoll';
import mockOption from '../../../testingResources/mockOption';
import { mockCreatorUser } from '../../../testingResources/mockUser';

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
                option: {
                    votes: [
                        {
                            id: "5c8e3c9c4160c2dd23e60e7e",
                            voter: {
                                user: {
                                    id: "5c8e228eae9bd6d9cea09c4f"
                                },
                                pseudonym: "Eve"
                            },
                            rating: 4
                        },
                        {
                            id: "5c8e67a8072925f2c180a658",
                            voter: {
                                user: {
                                    id: "5c8e67a1072925f2c180a656"
                                },
                                pseudonym: "Alf"
                            },
                            rating: 9
                        }
                    ]
                }
            },
        },
    },
];

test('<Poll />', async () => {
    const { getByTestId } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
            <ResultDetails poll={mockPoll} option={mockOption} user={mockCreatorUser} rank={1} />
        </MockedProvider>
    );
    expect(getByTestId('loading-state'));
    await waitForElement(() => getByTestId('result-details'));
    expect(getByTestId('my-vote'))
})
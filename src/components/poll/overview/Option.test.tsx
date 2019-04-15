import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import store from '../../../store';
import Option from './Option';

test('<Option> with user that is not creator', () => {
    const wrapper = render(
        <Provider store={store}>
            <Option
                option={{
                    title: "A test Option Title",
                    refId: "testOptionRefId",
                    creator: { id: "testUser1", email: "testUser1@example.com", name: "Test User 1" },
                    description: "A description of a test Option",
                    userRating: null,
                    result: {
                        totalOpposition: 0,
                        participationInPercent: 100,
                        agreementInPercent: 100
                    }
                }}
                userId="testUser2"
                pollId="testingPollId"
                userRating={null}
            />
        </Provider>
    );
    const { getByTestId } = wrapper;
    const header = getByTestId('option-header');
    fireEvent.click(header)
    expect(getByTestId('option-read-modal')).toBeTruthy()
})
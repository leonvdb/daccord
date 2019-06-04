import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import store from '../../../store';
import Overview from './index';
import mockPoll from '../../../testingResources/mockPoll';

window.matchMedia = jest.fn().mockImplementation(query => {
    return {
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
});

test('<Overview /> cancel unsaved changes', () => {
    const { getByTestId, queryByTestId } = render(
        <Provider store={store}>
            <MockedProvider>
                <Overview poll={mockPoll} />
            </MockedProvider>
        </Provider>
    );
    const ratingInput = getByTestId('scale-1') as HTMLInputElement
    fireEvent.click(ratingInput);
    expect(getByTestId('unsaved-changes-bar'));
    fireEvent.click(getByTestId('cancel-button'));
    expect(queryByTestId('unsaved-changes-bar')).toBeFalsy();
}) 
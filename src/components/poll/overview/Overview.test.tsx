import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import store from '../../../store';
import Overview from './index';
import mockPoll from '../../../testingResources/mockPoll';

test('<Overview /> cancel unsaved changes', () => {
    const { getByTestId, queryByTestId } = render(
        <Provider store={store}>
            <MockedProvider>
                <Overview poll={mockPoll} />
            </MockedProvider>
        </Provider>
    );
    const ratingInput = getByTestId('rating-input') as HTMLInputElement
    const initialValue = ratingInput.value
    fireEvent.change(ratingInput, {
        target: {
            value: parseInt(initialValue, 10) + 1
        }
    });
    expect(getByTestId('unsaved-changes-bar'));
    expect(ratingInput.value).not.toBe(initialValue);
    fireEvent.click(getByTestId('cancel-button'));
    expect(ratingInput.value).toBe(initialValue);
    expect(queryByTestId('unsaved-changes-bar')).toBeFalsy();
}) 
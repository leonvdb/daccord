import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import TextInputGroupParent from './TextInputGroupParent'


afterEach(cleanup);

const testError = "Test Error"

test('<TextInputGroupParent>', () => {
    const { getByTestId, queryByText } = render(
        <TextInputGroupParent />
    );
    expect(queryByText(testError)).toBeFalsy()
    const inputElement = (getByTestId('test-input') as HTMLInputElement)
    fireEvent.change(inputElement, {
        target: {
            value: 'test'
        }
    })
    expect(inputElement.value).toBe('test')
})

test('<TextInputGroupParent> with Error', () => {
    const { getByText } = render(
        <TextInputGroupParent error={testError} />
    );
    expect(getByText(testError))
})
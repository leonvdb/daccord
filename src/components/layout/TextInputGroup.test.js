import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { onChange } from '../../utilities/onChange'
import TextInputGroupParent from './TextInputGroupParent'


afterEach(cleanup);

const testError = "Test Error"

test('<TextInputGroupParent>', () => {
    const { debug, getByTestId, queryByText } = render(
        <TextInputGroupParent />
    );
    expect(queryByText(testError)).toBeFalsy()
    const inputElement = getByTestId('input')
    fireEvent.change(inputElement, {
        target: {
            value: 'test'
        }
    })
    expect(inputElement.value).toBe('test')
})

test('<TextInputGroupParent> with Error', () => {
    const { debug, getByText } = render(
        <TextInputGroupParent error={testError} />
    );
    expect(getByText(testError))
})
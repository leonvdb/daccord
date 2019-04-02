import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { onChange } from '../../utilities/onChange'
import TextInputGroupParent from './TextInputGroupParent'

test('<TextInputGroupParent>', () => {
    const { debug, getByTestId } = render(
        <TextInputGroupParent />
    );
    const inputElement = getByTestId('input')
    fireEvent.change(inputElement, {
        target: {
            value: 'test'
        }
    })
    debug();
    expect(inputElement.value).toBe('test')
})
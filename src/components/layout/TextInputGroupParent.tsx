//This module is only for testing

import React, { useState } from 'react'
import TextInputGroup from './TextInputGroup';

interface Props {
    error?: string
}

const TextInputGroupParent = (props: Props) => {
    const [test, setTest] = useState('')
    const onChange = (e: React.ChangeEvent<any>) => setTest(e.target.value)
    return (
        <div>
            <TextInputGroup
                testId="test-input"
                name="test"
                value={test}
                onChange={onChange}
                placeholder="TestPlaceHolder" error={props.error ? props.error : undefined} />
        </div>
    )
}

export default TextInputGroupParent;

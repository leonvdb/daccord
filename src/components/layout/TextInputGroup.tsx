import * as React from 'react';
import classname from 'classnames';
import { InputLabel, ErrorMessage } from '../../style/elements';
import styled from 'styled-components';
import { mediumGray } from '../../style/utilities';


interface Props {
    name: string,
    value: string,
    error?: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent) => void,
    type?: string,
    classNames?: string,
    className?: string,
    testId: string
}

export const MinimalTextInputGroup = ({
    name,
    value,
    error,
    placeholder,
    onChange,
    type = "text",
    classNames,
    className,
    testId
}: Props) => {
    return (
        <div className={`${classNames ? classNames : ''} ${className}`} >
            <InputLabel>Label</InputLabel>
            <input
                className={classname({ 'is-invalid': error })}
                data-testid={testId}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <ErrorMessage data-testid="error-message">{error}</ErrorMessage>}
        </div>
    );
};


export const TextInputGroup = styled(MinimalTextInputGroup)`
margin-bottom: 1rem;
${InputLabel}{
    margin-bottom: 4px;
}
input{
    width: 100%;
    height: 2.5rem;
    border-radius: 4px;
    border: 1px solid ${mediumGray};
    padding: .875rem;
}
`;


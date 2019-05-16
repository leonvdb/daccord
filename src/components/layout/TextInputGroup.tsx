import * as React from 'react';
import classname from 'classnames';


interface Props {
    name: string,
    value: string,
    error?: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent) => void,
    type?: string,
    classNames?: string,
    testId: string
}

const TextInputGroup = ({
    name,
    value,
    error,
    placeholder,
    onChange,
    type = "text",
    classNames,
    testId
}: Props) => {
    return (
        <div className={`form-group mx-auto ${classNames ? classNames : ''}`} >
            <input
                className={classname('form-control', { 'is-invalid': error })}
                data-testid={testId}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <div data-testid="error-message" className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextInputGroup
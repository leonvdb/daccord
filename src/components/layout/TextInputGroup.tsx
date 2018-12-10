import * as React from 'react';
import classname from 'classnames';

interface Props {
    label: string,
    name: string,
    value: string,
    error?: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent) => void,
    type?: string,
    classNames: string
}

const TextInputGroup = ({
    label,
    name,
    value,
    error,
    placeholder,
    onChange,
    type = "text",
    classNames
}: Props) => {
    return (
        <div className={`form-group mx-auto ${classNames}`} >
            <label htmlFor={name}>{label}</label>
            <input className={classname('form-control', {
                'is-invalid': error
            })}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextInputGroup
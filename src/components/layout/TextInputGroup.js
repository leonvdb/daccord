import React from 'react';
import classname from 'classnames';

const TextInputGroup = ({
    label,
    name,
    value,
    error,
    placeholder,
    onChange,
    type,
    classNames
}) => {
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
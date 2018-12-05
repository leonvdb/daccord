import React from 'react'

const TextInputGroup = ({
    label,
    name,
    value,
    error,
    placeholder,
    onChange,
    type
}) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            {error && <div>{error}</div>}
        </div>
    );
};

export default TextInputGroup
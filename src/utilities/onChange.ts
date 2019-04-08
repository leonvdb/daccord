import * as React from 'react';


export function onChange(this: React.Component, e: React.ChangeEvent<any>) {
    const propertyName = e.target.name
    const value = e.target.value
    this.setState(prevState => {
        const newState = { ...prevState };
        newState[propertyName] = value
        return newState
    })
};
import React, { Component } from 'react'

export default class Option extends Component {
    render() {

        const { id, title, description } = this.props.option;

        return (
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        )
    }
}

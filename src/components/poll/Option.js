import React, { Component } from 'react'

export default class Option extends Component {
    render() {

        const { id, title, description } = this.props.option;

        return (
            <div className="card d-inline-block mx-2">
                <div className="card-header">
                    <h5 className="card-title">{title}</h5>
                </div>
                <div className="card-body">
                    <p className="card-text">{description}</p>
                </div>
            </div>
        )
    }
}

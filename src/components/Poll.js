import React, { Component } from 'react'
import Vote from './poll/Vote';

class Poll extends Component {
    render() {
        return (
            <div>
                <h1>I will be a poll container</h1>
                <Vote />
            </div>
        )
    }
}

export default Poll
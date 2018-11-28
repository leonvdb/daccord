import React, { Component } from 'react'

import Option from './Option';

class Vote extends Component {

    //Placeholder before Redux Setup
    state = {
        options: [
            {
                id: 1,
                title: "Option A",
                description: "In option A we do this and that and also this."
            },
            {
                id: 2,
                title: "Option B",
                description: "In option B we do this and that and also this."
            },
            {
                id: 3,
                title: "Option C",
                description: "In option C we do this and that and also this."
            },
        ]
    }

    render() {
        const { options } = this.state;

        return (
            <div>
                {options.map(option => (
                    <Option
                        key={option.id}
                        option={option}
                    />
                ))}
            </div>
        );
    }
}

export default Vote;
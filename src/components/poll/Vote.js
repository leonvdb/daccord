import React, { Component } from 'react'

import Option from './Option';

class Vote extends Component {

    render() {
        const { options } = this.props;

        return (
            <div className="mt-5 d-flex flex-wrap">
                {options.map(option => (
                    <Option
                        key={option._id}
                        option={option}
                    />
                ))}
            </div>
        );
    }
}

export default Vote;
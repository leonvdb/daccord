import React, { Component } from 'react'

import Option from './Option';
import AddOption from './AddOption';

class Vote extends Component {

    render() {
        const { options } = this.props;

        return (
            <div className="container">
                <div className="mt-5 d-flex flex-wrap">
                    <AddOption />
                    {options.map(option => (
                        <Option
                            key={option._id}
                            option={option}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Vote;
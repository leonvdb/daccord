import * as React from 'react';

import { Options } from '../../../interfaces';

import Option from './Option';
import AddOption from './AddOption';

interface Props { options: Options[] }

class Vote extends React.Component<Props> {

    render() {
        const { options } = this.props;

        return (
            <div className="container">
                <div className="mt-5 d-flex flex-wrap">
                    <AddOption />
                    {options.map(option => (
                        <Option
                            key={option.refId}
                            option={option}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Vote;
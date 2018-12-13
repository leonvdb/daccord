import * as React from 'react'
import { Options } from '../../interfaces';

interface Props { option: Options }

export default class Option extends React.Component<Props>{
    render() {

        const { title, description } = this.props.option;

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <div className="card" style={{ height: 150 }}>
                    <div className="card-header">
                        <h5 className="card-title">{title}</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{description}</p>
                    </div>
                </div>
            </div >
        )
    }
}

import * as React from 'react';
import { IOptionQuery } from '../../../interfaces';

interface Props {
    option: IOptionQuery
}

class ResultElement extends React.Component<Props>{
    render(){
        const { option } = this.props
        console.log(option.result.agreementInPercent)
        return (
            <React.Fragment>
                <p style={{marginBottom: "0"}}>{option.title}</p>
                <div className="mb-3" style={{width: `${option.result.agreementInPercent ? option.result.agreementInPercent : 0}%`, height: "10px", background: "#ccc"}}/>
            </React.Fragment>
        )
    }
}

export default ResultElement
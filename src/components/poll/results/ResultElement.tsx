import * as React from 'react';
import { IOptionQuery } from '../../../interfaces';

interface Props {
    option: IOptionQuery
}

class ResultElement extends React.Component<Props>{
    render(){
        const { option } = this.props
        return (
            <React.Fragment>
                <div className="clearfix">
                    <p style={{marginBottom: "0", display: "inline-block"}}>{option.title}</p>
                    <p style={{marginBottom: "0", float: "right", display: "inline-block"}}>{option.result.agreementInPercent ? option.result.agreementInPercent : 0}% agreement</p>
                </div>
                <div className="mb-3" style={{width: `${option.result.agreementInPercent ? option.result.agreementInPercent : 0}%`, height: "10px", background: "#ccc", display: "inline-block"}}/>
                <div className="mb-3" style={{width: `${option.result.agreementInPercent ? 100-option.result.agreementInPercent : 100}%`, height: "10px", background: "#F3F3F3", display: "inline-block"}}/>
            </React.Fragment>
        )
    }
}

export default ResultElement
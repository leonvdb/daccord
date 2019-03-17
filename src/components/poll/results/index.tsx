import * as React from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import ResultElement from './ResultElement';

interface Props {
    poll: IPollQuery
    user: IUser
}

class Results extends React.Component<Props>{
    render(){
        const {options, refId} = this.props.poll
        const sortedOptions = options.sort((a, b) => {
            if(a.result.agreementInPercent > b.result.agreementInPercent){
                return -1
            } else if(a.result.agreementInPercent < b.result.agreementInPercent){
                return 1
            } else {
                return 0
            }
        })

        return (
            <div className="container-fluid px-5">
                <h1 className="my-5">Results</h1>
                
                {sortedOptions.map(option => {
                    return <ResultElement key={option.refId} option={option} pollId={refId} user={this.props.user}/>
                })}
            </div>
        )
    }
}

export default Results;
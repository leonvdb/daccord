import * as React from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import ResultElement from './ResultElement';
import { Container } from '../../../style/elements';

interface Props {
    poll: IPollQuery
    user: IUser
}

class Results extends React.Component<Props>{
    render() {
        const unsortedOptions = [...this.props.poll.options]
        const sortedOptions = unsortedOptions.sort((a, b) => {
            if (a.result.agreementInPercent > b.result.agreementInPercent) {
                return -1
            } else if (a.result.agreementInPercent < b.result.agreementInPercent) {
                return 1
            } else {
                return 0
            }
        })
        return (
            <Container>
                <h1>Results</h1>

                {sortedOptions.map((option, index) => {
                    return <ResultElement key={option.refId} option={option} poll={this.props.poll} user={this.props.user} rank={index + 1} />
                })}
            </Container>
        )
    }
}

export default Results;
import * as React from 'react';
import { IPollQuery, IUser } from '../../../interfaces';
import ResultElement from './ResultElement';
import { Container, LargeLabel } from '../../../style/elements';
import styled from 'styled-components';

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
                <LargeLabel>Results</LargeLabel>
                <OptionContainer>
                    {sortedOptions.map((option, index) => {
                        return <ResultElement key={option.refId} option={option} poll={this.props.poll} user={this.props.user} rank={index + 1} />
                    })}
                </OptionContainer>
            </Container>
        )
    }
}

const OptionContainer = styled.div`
${ResultElement}:first-child{
    border-radius: 5px 5px 0 0;
}
${ResultElement}:last-child{
    border-radius: 0 0 5px 5px;
}
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
`;

export default Results;
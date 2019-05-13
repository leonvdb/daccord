import React from 'react'
import { Query } from 'react-apollo';
import { GET_INDIVIDUAL_VOTES } from '../../../../graphql/getPoll';
import styled from 'styled-components';
import { TableCellWrapper } from '../../../../style/elements';
import { darkGray } from '../../../../style/utilities';
import { IPollQuery, IUser } from '../../../../interfaces';
import ResultRow from '../ResultRow';
import ParticipantsRow from '../ParticipantsRow';

interface Props {
    poll: IPollQuery
    pseudonym: string
    user: IUser
}

const TableView = (props: Props) => {
    return (
        <Query query={GET_INDIVIDUAL_VOTES} variables={{ id: props.poll.refId }}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) {
                    console.log({ error })
                    return <p>{error.message ? error.message.replace('GraphQL error: ', '') : 'Error :('}</p>
                }
                console.log({ data })
                return (<OptionContainer>
                    <TableWrapper>
                        <ParticipantsRow poll={props.poll} pseudonym={props.pseudonym} user={props.user} />
                        <ResultRow />
                    </TableWrapper>
                </OptionContainer>)
            }}

        </Query>
    )
}

const TableWrapper = styled.div`
display: table;
background: white;
width: 100%;
text-align: center;
${TableCellWrapper}{
    height: 4.5625rem;
    &:first-child{
        border-left: none;
    border-right: solid 2px ${darkGray};
    }
    &:nth-child(2){
        border-left: none;
    }
}
`;

const OptionContainer = styled.div`
overflow: hidden;
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
`;

export default TableView


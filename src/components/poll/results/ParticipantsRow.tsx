import React from 'react'
import { TableCellWrapper } from '../../../style/elements';
import styled from 'styled-components';
import { darkGray } from '../../../style/utilities';
import { IPollQuery } from '../../../interfaces';

interface Props {
    className?: string
    poll: IPollQuery
    pseudonym: string
}
const ParticipantsRow = (props: Props) => {
    const { participants } = props.poll

    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={29.29} />
            <TableCellWrapper widthInPercent={10}>
                {props.pseudonym}
            </TableCellWrapper>
            {[...Array(6).keys()].map(fieldId => {
                console.log(participants[fieldId])
                return (<TableCellWrapper widthInPercent={10} key={`Participant-${fieldId}`}>
                    {participants[fieldId] ? participants[fieldId].user.id : ""}
                </TableCellWrapper>)
            })}
        </div>
    )
}

export default styled(ParticipantsRow)`
display: table-row;
${TableCellWrapper}{
    border-left: solid 1px #DDD;
    border-bottom: solid 2px ${darkGray};
    font-weight: 500;
}
`;

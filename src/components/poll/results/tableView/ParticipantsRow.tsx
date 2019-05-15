import React from 'react'
import { TableCellWrapper } from '../../../../style/elements';
import styled from 'styled-components';
import { darkGray } from '../../../../style/utilities';

interface Props {
    className?: string
    displayedParticipants: Array<{ id: string, pseudonym: string }>
}
const ParticipantsRow = (props: Props) => {
    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={29.29} />
            {[...Array(7).keys()].map((fieldId, index) => {
                return (<TableCellWrapper widthInPercent={10} key={`Participant-${fieldId}`}>
                    {props.displayedParticipants[index] ? props.displayedParticipants[index].pseudonym : ''}
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

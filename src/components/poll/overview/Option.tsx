import React, { useState } from 'react'
import styled from 'styled-components';
import { IOptionQuery } from '../../../interfaces';
import OptionReadModal from './OptionReadModal';
import OptionEditModal from './OptionEditModal';
import { TableCellWrapper, HeadingTwo } from '../../../style/elements';
import VotingScale from './VotingScale';

interface Props {
    option: IOptionQuery
    userId: string
    pollId: string
    userRating: number | null
    className?: string
}

const Option = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const onClick = () => {
        setModalOpen(true);
    }

    const toggle = () => {
        setModalOpen(!modalOpen)
    }

    const { title, description, creator } = props.option;
    const isCreator = creator.id.toString() === props.userId.toString()

    return (
        <div className={props.className}>
            <TableCellWrapper widthInPercent={67}>
                <HeadingTwo onClick={onClick} data-testid="option-heading">
                    {title}
                </HeadingTwo>
            </TableCellWrapper>
            <TableCellWrapper widthInPercent={33}>
                <VotingScale userRating={props.userRating === null ? undefined : props.userRating} optionId={props.option.refId} />
            </TableCellWrapper>
            {isCreator ? (
                <OptionEditModal
                    pollId={props.pollId}
                    option={props.option}
                    modalOpen={modalOpen}
                    toggle={toggle} />
            ) : (
                    <OptionReadModal
                        title={title}
                        description={description}
                        modalOpen={modalOpen}
                        toggle={toggle} />
                )
            }
        </div >
    )
}


export default styled(Option)`
width: 100%;
height: 3.5rem;
max-height: 3.5rem;
margin-bottom: .5625rem;
background: white;
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
display: table;
${HeadingTwo}{
    margin: 0 0 0 1.625rem;
}
`;
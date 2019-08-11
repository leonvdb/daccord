import React, { useState } from 'react'
import styled from 'styled-components';
import { IOptionQuery } from '../../../interfaces';
import OptionReadModal from './OptionReadModal';
import OptionEditModal from './OptionEditModal';
import { HeadingTwo, Label, Divider, SmallParagraph } from '../../../style/elements';
import VotingScale from './VotingScale';
import ExpandButton from '../../../style/elements/Expand';
import { Flex, Box } from '@rebass/grid';

interface Props {
    option: IOptionQuery
    userId: string
    pollId: string
    userRating: number | null
    className?: string
}

const Option = (props: Props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [showDetails, setShowDetails] = useState(false)

    const onClick = () => {
        setModalOpen(true);
    }

    const toggle = () => {
        setModalOpen(!modalOpen)
    }

    const { title, description, creator } = props.option;
    const isCreator = creator.id.toString() === props.userId.toString()

    return (
        <Flex className={props.className} flexWrap='wrap' >
            <Box width={[5 / 6, 8 / 9, 12 / 13, 17 / 18]}>
                <Flex flexWrap='wrap'>
                    <BoxWrapper width={[1, 1, 1, 11 / 17, 12 / 17]} pl={["1rem", "1.625rem"]}>
                        <HeadingTwo onClick={onClick} data-testid="option-heading">
                            {title}
                        </HeadingTwo>
                    </BoxWrapper>
                    <BoxWrapper width={[1, 1, 1, 6 / 17, 5 / 17]} pl={["1rem", "1.625rem", "1.625rem", 0]}>
                        <VotingScale userRating={props.userRating === null ? undefined : props.userRating} optionId={props.option.refId} />
                    </BoxWrapper>
                </Flex>
            </Box>
            <BoxWrapper width={[1 / 6, 1 / 9, 1 / 13, 1 / 18]}>
                <ExpandButton clicked={showDetails} onClick={ // tslint:disable-next-line jsx-no-lambda
                    () => { setShowDetails(!showDetails) }} />
            </BoxWrapper>
            {showDetails && <div>
                <Box width={[5 / 6, 8 / 9, 12 / 13, 17 / 18]} pl={["1rem", "1.625rem"]}>
                    <Divider />
                    <Label className="description-label">Description</Label>
                    <SmallParagraph>
                        {description}
                    </SmallParagraph>
                </Box>

            </div>}
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
        </Flex>
    )
}

const BoxWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 3.5rem;
`;

export default styled(Option)`
width: 100%;
margin-bottom: .5625rem;
background: white;
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
${VotingScale}{
    display: inline-block;
}
${HeadingTwo}{
    cursor: pointer;
}
.description-label{
    margin-top: .625rem;
}
`;
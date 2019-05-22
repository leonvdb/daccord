import React, { useState } from 'react'
import styled from 'styled-components';
import { IOptionQuery } from '../../../interfaces';
import OptionReadModal from './OptionReadModal';
import OptionEditModal from './OptionEditModal';
import { HeadingTwo } from '../../../style/elements';
import VotingScale from './VotingScale';
import ExpandButton from '../../../style/elements/Expand';
import Label from 'reactstrap/lib/Label';
import { Container, Row, Col } from 'styled-bootstrap-grid';

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
        <Container fluid={true} className={props.className}>
            <Row>
                <Col col={8}>
                    <Box>
                        <HeadingTwo onClick={onClick} data-testid="option-heading">
                            {title}
                        </HeadingTwo>
                    </Box>
                </Col>
                <Col col={4}>
                    <Row>
                        <Col col={10}>
                            <Box>
                                <VotingScale userRating={props.userRating === null ? undefined : props.userRating} optionId={props.option.refId} />
                            </Box>
                        </Col>
                        <Col col={2}>
                            <Box>
                                <ExpandButton clicked={showDetails} onClick={ // tslint:disable-next-line jsx-no-lambda
                                    () => { setShowDetails(!showDetails) }} />
                            </Box>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {showDetails && <div>
                <Label>Details</Label>

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
        </Container>
    )
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export default styled(Option)`
width: 100%;
height: 3.5rem;
max-height: 3.5rem;
margin-bottom: .5625rem;
background: white;
box-shadow: 0px 2px 8px rgba(104, 104, 104, 0.25);
border-radius: 5px;
${HeadingTwo}{
    margin: auto 0 auto 1.625rem;
}
${VotingScale}{
    display: inline-block;
}
${Row}{
    height: 100%;
}
${Col}{
    height: 100%;
    ${Row}{
        margin: 0;
    }
}
`;
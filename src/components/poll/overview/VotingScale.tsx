import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components';
import { lightGray, scale, softBlack, above } from '../../../style/utilities';
import { Dispatch, AnyAction } from 'redux';
import { handleRatingChange } from '../../../actions/voteActions';
import { connect } from 'react-redux';

interface Props extends PropsFromDispatch {
    className?: string
    userRating?: number
    optionId: string
}


const VotingScale = (props: Props) => {
    const [current, setCurrent] = useState(props.userRating);
    const [hovering, setHovering] = useState(false)
    const onClick = (fieldNumber: number) => {
        if (props.userRating === fieldNumber) {
            setCurrent(undefined)
            props.handleRatingChange(props.optionId, null)
        } else {
            props.handleRatingChange(props.optionId, fieldNumber)
        }
    }

    useEffect(() => {
        if (!hovering) setCurrent(props.userRating);
    })

    return (
        <div className={props.className} >
            <ColoredBar current={current} />
            {[...Array(11).keys()].map(fieldNumber => (<Wrapper key={`${props.optionId}${fieldNumber}`}
                data-testid={`scale-${fieldNumber}`}
                onMouseEnter={// tslint:disable-next-line jsx-no-lambda
                    () => {
                        setCurrent(fieldNumber);
                        setHovering(true)
                    }}
                onMouseLeave={// tslint:disable-next-line jsx-no-lambda
                    () => {
                        setCurrent(props.userRating)
                        setHovering(false)
                    }}
                onClick={// tslint:disable-next-line jsx-no-lambda
                    () => { onClick(fieldNumber) }}>
                <VotingNumber
                    fieldNumber={fieldNumber}
                    current={current}
                >
                    {fieldNumber}
                </VotingNumber>
            </Wrapper>
            )
            )
            }
        </div>
    )
}

interface VotingNumberProps {
    fieldNumber: number
    current?: number
}

const ColoredBarStyle = (current: number) => {

    return css`
    width: ${1.375 + current * 1.375}rem;
    
    background: ${scale[current].linear};
${above.custom(370)}{
    width: ${1.375 + current * 1.5}rem;
}
${above.custom(421)}{
    width: ${1.375 + current * 1.75}rem;
}
${above.lg}{
    width: ${1.375 + current * 1.5}rem;
}
${above.custom(1370)}{
    width: ${1.375 + current * 1.75}rem;
}
    `
}

const Wrapper = styled.div`
height: 1.375rem;
width: 1.375rem;
display: table-cell;
${above.custom(370)}{
    width: 1.5rem;
}
${above.custom(421)}{
    width: 1.75rem;
}
${above.lg}{
    width: 1.5rem;
}
${above.custom(1370)}{
    width: 1.75rem;
}
`

const VotingNumber = styled.span<VotingNumberProps>`
cursor: pointer;
border: solid 2px ${lightGray};
width: 1.375rem;
height: 1.375rem;
border-radius: 50%;
text-align: center;
font-size: 0.75rem;
font-weight: 500;
color: ${lightGray};
position: relative;
display: block;
z-index: 1;
${({ current, fieldNumber }) => current === fieldNumber ? css`
    border: solid 2px ${scale[current].solid};
    color: ${softBlack};
    font-weight: bold;
    background-color: white;
    ` : current !== undefined && current > fieldNumber ? css`
    color: white;
    border: solid 2px rgba(0,0,0,0);
    ` : ""
    }

`;


const ColoredBar = styled.div<{ current?: number }>`
height: 1.375rem;
position: absolute;
border-radius: 30px;
width: 0;
${({ current }) => current !== undefined && ColoredBarStyle(current)};

`

interface PropsFromDispatch {
    handleRatingChange: (optionId: string, rating: number | null) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): PropsFromDispatch => {
    return {
        handleRatingChange: (optionId: string, rating: number | null) => dispatch(handleRatingChange(optionId, rating))
    }
}

const styledVotingScale = styled(VotingScale)`
height: 1.375rem;
display: table;
vertical-align: middle;
`;

export default connect(null, mapDispatchToProps)(styledVotingScale);
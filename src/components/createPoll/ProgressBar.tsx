import React from 'react'
import styled, { css } from 'styled-components';
import { above, mediumGray, primaryStrong } from '../../style/utilities';
import Step from '../poll/layout/Step';

interface IProps {
    className?: string
    counter: number
}


const ProgressBar = ({ className, counter }: IProps) => {
    return (
        <div className={className}>
            <Step count="1" focused={counter === 1} active={counter >= 1}>General Information</Step>
            <Bar overlay={true} progress={counter === 1 ? 1 / 2 : 1} />
            <Bar overlay={false} progress={counter === 1 ? 1 / 2 : 1} />
            <Step count="2" focused={counter === 2} active={counter >= 2}>Information about you</Step>
        </div>
    )
}


const Bar = styled.div<{ progress: number, overlay: boolean }>`
${({ progress }) => progress === 1 / 2 ? css`margin-bottom: -4px;` : css`margin-top: -4px;`}
height: 3.125rem;
width: 2px;
background-color: ${mediumGray};
margin-left: 17px;
transition: height ease-in-out .4s;
${({ progress, overlay }) => overlay ? css`
    position: absolute;
    background-color: ${primaryStrong};
    height: ${progress * 3.125}rem;
`: ''
    }
`;


export default React.memo(styled(ProgressBar)`
    margin-top: 32.25rem;
    margin-left: 1.875rem;
    ${above.custom(1300)}{
    margin-left: .875rem;
}
`)

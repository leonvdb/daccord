import React from 'react'
import styled from 'styled-components';
import { softBlack } from '../../../style/utilities';

interface Props {
    sqSize: number
    strokeWidth: number
    percentage: number
    className?: string
    color: string
}

const CircularProgressBar = (props: Props) => {
    const { sqSize, strokeWidth, percentage } = props

    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = (radius * Math.PI * 2) * .988;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - dashArray * percentage / 100;
    return (
        <svg
            width={sqSize}
            height={sqSize}
            viewBox={viewBox}
            className={props.className}
            color={props.color}>
            <circle
                className="circle-background"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`} />
            <circle
                className="circle-progress"
                cx={sqSize / 2}
                cy={sqSize / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
                // Start progress marker at 12 O'Clock
                transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset
                }} />
            <text
                className="circle-text"
                x="50%"
                y="50%"
                dy=".3em"
                textAnchor="middle">
                <tspan>{`${percentage}`}</tspan>
                <tspan className="percent-symbol">%</tspan>
            </text>
        </svg>
    )
}

export default styled(CircularProgressBar) <Props>`
.circle-background,
.circle-progress {
  fill: none;
}

.circle-background {
  stroke: #E1E1E1;
}

.circle-progress {
  stroke: ${({ color }) => color};
  stroke-linecap: round;
}

.circle-text {
  font-size: ${({ percentage }) => percentage === 100 ? '1rem' : '1.25rem'};
  font-weight: bold;
  fill: ${softBlack}
}

.percent-symbol{
    font-size: .9375rem;
}
`;


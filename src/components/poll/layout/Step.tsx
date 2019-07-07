import React from 'react'
import Counter from '../../../images/counter';
import styled from 'styled-components';
import { smallerLabel } from '../../../style/utilities';

interface IProps {
    className?: string
    count: string
    focused: boolean
    children: string
    active: boolean
}

const Step = ({ className, count, focused, children, active }: IProps) => {
    return (
        <div className={className}>
            <Counter count={count} focused={focused} active={active} />
            <span className={active ? '' : 'inactive'}>{children}</span>
        </div>
    )
}


export default styled(Step)`
.inactive{
    color: '#D1D1D1'
}
span{
    ${smallerLabel}
    margin-left: 1.25rem;
}
`;
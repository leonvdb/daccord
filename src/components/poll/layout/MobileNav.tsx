import React from 'react'
import styled from 'styled-components';
import { primary } from '../../../style/utilities';

interface IProps {
    className?: string
    isOpen: boolean
}

const MobileNav = (props: IProps) => {
    return (
        <div className={props.className} />
    )
}


export default styled(MobileNav) <{ isOpen: boolean }>`
position: fixed;
background: ${primary};
width: 0;
transition: width .4s ease-in-out;
height: 100vh;
${({ isOpen }) => isOpen && 'width: 18.25rem;'}
`

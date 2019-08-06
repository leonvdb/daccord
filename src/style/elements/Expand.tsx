import React from 'react'
import styled from 'styled-components';

interface Props {
  clicked: boolean
  onClick?: () => void
  alt?: string
}

const ExpandButton = (props: Props) => {
  const { clicked, onClick } = props
  return (
    <ExpandImage clicked={clicked} onClick={onClick} width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L7.28571 7L13 1" stroke="#6923FF" strokeWidth="2" strokeLinecap="round" />
    </ExpandImage>
  )
}

const ExpandImage = styled.svg<{ clicked: boolean }>`
margin-left: .5rem;
transform: ${({ clicked }) => clicked ? 'rotate(180deg)' : 'rotate(0deg)'};
transition: transform 0.3s ease-in-out;
`;

export default ExpandButton

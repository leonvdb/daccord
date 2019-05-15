import React from 'react'
import ExpandSVG from '../../images/expand.svg'
import styled from 'styled-components';

interface Props {
  clicked: boolean
  onClick?: () => void
  alt?: string
}

const ExpandButton = (props: Props) => {
  const { clicked, alt, onClick } = props
  return (
    <ExpandImage clicked={clicked} src={ExpandSVG} alt={alt} onClick={onClick} />
  )
}

const ExpandImage = styled.img<{ clicked: boolean }>`
transform: ${({ clicked }) => clicked ? 'rotate(180deg)' : 'rotate(0deg)'};
transition: transform 0.3s ease-in-out;
`;

export default ExpandButton

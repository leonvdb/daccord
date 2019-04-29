import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { white } from '../utilities';

export const UnstyledLink = styled(Link)`
    background: none;
	color: ${white};
	font: inherit;
    cursor: pointer;
    &:hover{
        color: gray;
	    text-decoration: none;
    }
`
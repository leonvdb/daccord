import React from 'react';
import styled from 'styled-components';

interface IProps {
  className?: string
  count: string
  focused: boolean
  active: boolean
}

const Counter = (props: IProps) => {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={props.className}>
      <circle cx="18" cy="18" r="15" fill={props.active ? "#6E49FF" : "#DFDFDF"} />
      {props.focused && <circle cx="18" cy="18" r="17.5" stroke="#6E49FF" />}
      <text x="13" y="24">{props.count}</text>
    </svg>
  )
}

export default styled(Counter)`
text{
font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
font-size: 18px; 
fill: #fff; 
font-weight: 500;
}
`;


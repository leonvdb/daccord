import React from 'react'
import { IPollQuery } from '../../../interfaces';

interface Props {
    poll: IPollQuery
    pseudonym: string
}

const Header = ({poll, pseudonym}: Props) =>  {
  return (
    <div>
      <h1>{poll.title}</h1>
      <p>Description: {poll.description} </p>
      <button>{pseudonym}</button>
    </div>
  )
}

export default Header;
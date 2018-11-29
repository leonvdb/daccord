import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <h1>I am the header</h1>
            <div>
                <ul>
                    <li>
                        <Link to="/">
                            Home
                        </Link>
                        <Link to="/create">
                            Create poll
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
import React from 'react'
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">WorkInProgress</Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/create">
                            Create poll
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header;
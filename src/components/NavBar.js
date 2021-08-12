import React from 'react';
import { NavLink, Route, Switch, withRouter } from 'react-router-dom';
import 'bulma/css/bulma.min.css';

export default function NavBar() {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <NavBar>
            <div className="navbar-brand">
                <a className="navbar-item" href="">
                <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                </a>
            </div>

            <a className="navBar-item">
                <NavLink to="/login">Log In</NavLink>
            </a>
            </NavBar>
        </nav>
    )
}

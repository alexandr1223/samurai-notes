import React from 'react';
import { NavLink } from 'react-router-dom';
import './main.sass';

function Main() {
    return (
        <div className="main">
            <h1 className="main__title">Главная</h1>
            <NavLink to="/login" activeClassName="sidebar__active">Главная</NavLink>
        </div>
    )
}

export default Main

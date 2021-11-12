import React from 'react'
import { NavLink } from 'react-router-dom'

function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <ul className="sidebarMenu">
                    <li>
                        <NavLink to="/home" activeClassName="sidebar__active">Главная</NavLink>
                    </li>
                    <li >
                        <NavLink to="/notes" activeClassName="sidebar__active">Заметки</NavLink>
                    </li>
                    <li>
                        <NavLink to="/financePortfolio" activeClassName="sidebar__active">Финансовый портфель</NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" activeClassName="sidebar__active">Настройки</NavLink>
                    </li>
                </ul>
                
            </div>
           
        </div>
    )
}

export default Sidebar;

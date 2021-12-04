import React from 'react'
import { NavLink } from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'
import {CgNotes} from 'react-icons/cg'
import {GrMoney} from 'react-icons/gr'
import {IoSettingsOutline} from 'react-icons/io5/';
import logo from '../../assets/img/logo.svg';
import './sidebar.sass'

function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src={logo} alt="" />
            </div>
            <div className="sidebar__top">
                <ul className="sidebarMenu">
                    <li>
                        <NavLink to="/home" activeClassName="sidebar__active"><AiOutlineHome /> Главная</NavLink>
                    </li>
                    <li>
                        <NavLink to="/notes" activeClassName="sidebar__active"><CgNotes /> Заметки</NavLink>
                    </li>
                    <li>
                        <NavLink to="/financePortfolio" activeClassName="sidebar__active"><GrMoney /> Финансы</NavLink>
                    </li>
                    <li>
                        <NavLink to="/settings" activeClassName="sidebar__active"><IoSettingsOutline /> Настройки</NavLink>
                    </li>
                </ul>
                
            </div>
           
        </div>
    )
}

export default Sidebar;

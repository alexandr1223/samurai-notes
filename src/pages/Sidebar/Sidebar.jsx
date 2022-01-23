import React from 'react'
import { NavLink } from 'react-router-dom'
import {AiOutlineHome} from 'react-icons/ai'
import {CgNotes} from 'react-icons/cg'
import {GrMoney} from 'react-icons/gr'
import {IoSettingsOutline} from 'react-icons/io5/';
import logo from '../../assets/img/logo.svg';
import { useSelector } from 'react-redux'
import api from '../../services/api'
import './sidebar.sass'

function Sidebar() {

    const isLoaded = useSelector(({auth}) => auth.isLoaded)
    console.log(isLoaded)

    const logout = () => {
        
    }

    return isLoaded ? (
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
                    <li>
                        <button onClick={logout} className="sidebar__logout">
                            Выход
                        </button>
                    </li>
                </ul>
                
            </div>
           
        </div>
    ) : (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src={logo} alt="" />
            </div>
            <div className="sidebar__top">
                <ul className="sidebarMenu">
                    <li>
                        <NavLink to="/home" activeClassName="sidebar__active"><AiOutlineHome /> Главная</NavLink>
                    </li>
                </ul>
                
            </div>
           
        </div>
    )
}

export default Sidebar;

import React from 'react'
import { userMenu } from './Menus/userMenu'
import { NavLink, useLocation } from 'react-router-dom'
import '../../../component/style/Layout.css'
function Sidebar() {
    let location = useLocation()
    return (
        <>
            {
                userMenu.map((item) => {
                    let isActive = location.pathname === item.path
                    return (
                        <div className={isActive && "navbarActive"}>
                            <i className={`${item.icon} custom-icon`}></i>
                            <NavLink to={item.path} className={"nav-style"}>{item.name}</NavLink>
                        </div>
                    )
                })
            }</>

    )
}

export default Sidebar